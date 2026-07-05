#!/usr/bin/env python3
"""mail-image-bot — event-driven Gmail image fetcher.

Keeps a persistent IMAP IDLE connection to Gmail. When a new unseen mail
containing a direct image link arrives, downloads the image and replies to
the same thread with the image attached. Failures are reported back to the
sender by mail instead of failing silently.

Configuration comes from the environment (loaded by systemd from
/opt/mail-image-bot/mail-image-bot.env):
    EMAIL_USER  Gmail address
    EMAIL_PASS  Gmail App Password
"""

import email
import email.policy
import logging
import mimetypes
import os
import re
import smtplib
import sys
import time
from email.message import EmailMessage
from html import unescape
from urllib.parse import urlsplit

import requests
from imapclient import IMAPClient, SEEN

IMAP_HOST = "imap.gmail.com"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 465

# Loop prevention: every reply the bot sends carries this header, and every
# incoming message that carries it is skipped.
BOT_HEADER = "X-Mail-Image-Bot"

# Gmail silently drops IDLE connections after ~29 minutes, so renew earlier.
IDLE_RENEW_SECONDS = 14 * 60
IDLE_POLL_SECONDS = 30

MAX_IMAGE_BYTES = 20 * 1024 * 1024
DOWNLOAD_TIMEOUT = 60

URL_RE = re.compile(r"https?://[^\s<>\"']+")
HTML_TAG_RE = re.compile(r"<[^>]+>")

log = logging.getLogger("mail-image-bot")


class ProcessingError(Exception):
    """Per-message failure whose text is mailed back to the sender."""


def _search_url(text):
    match = URL_RE.search(text)
    if match:
        return match.group(0).rstrip(".,;:)>]}")
    return None


def extract_first_url(msg):
    """Return the first http(s) link in the message body.

    Prefers the text/plain part; falls back to the HTML part stripped of
    tags, and finally to the raw HTML (to catch links that appear only
    inside href attributes).
    """
    plain = msg.get_body(preferencelist=("plain",))
    if plain is not None:
        url = _search_url(plain.get_content())
        if url:
            return url

    html_part = msg.get_body(preferencelist=("html",))
    if html_part is not None:
        html = html_part.get_content()
        url = _search_url(unescape(HTML_TAG_RE.sub(" ", html)))
        if url:
            return url
        return _search_url(unescape(html))

    return None


def download_image(url):
    """Download *url* and return (bytes, content_type).

    Raises ProcessingError if the URL is unreachable, is not an image,
    or exceeds MAX_IMAGE_BYTES.
    """
    try:
        response = requests.get(
            url,
            stream=True,
            timeout=DOWNLOAD_TIMEOUT,
            headers={"User-Agent": "mail-image-bot/1.0"},
        )
    except requests.RequestException as exc:
        raise ProcessingError(f"Download failed: {exc}")

    with response:
        if response.status_code != 200:
            raise ProcessingError(
                f"Download failed: server returned HTTP {response.status_code}"
            )

        content_type = (
            (response.headers.get("Content-Type") or "")
            .split(";")[0]
            .strip()
            .lower()
        )
        if not content_type.startswith("image/"):
            raise ProcessingError(
                "The link does not point to an image "
                f"(Content-Type: {content_type or 'unknown'})."
            )

        declared = response.headers.get("Content-Length")
        if declared and declared.isdigit() and int(declared) > MAX_IMAGE_BYTES:
            raise ProcessingError(
                f"Image is too large ({int(declared)} bytes; limit is 20 MB)."
            )

        data = bytearray()
        for chunk in response.iter_content(chunk_size=64 * 1024):
            data.extend(chunk)
            if len(data) > MAX_IMAGE_BYTES:
                raise ProcessingError("Image exceeds the 20 MB size limit.")

    return bytes(data), content_type


def attachment_filename(url, content_type):
    name = os.path.basename(urlsplit(url).path)
    if not name or "." not in name:
        extension = mimetypes.guess_extension(content_type) or ".img"
        name = (name or "image") + extension
    return name


def send_reply(user, password, original, body, attachment=None):
    """Send a reply to *original* on the same thread.

    *attachment* is an optional (data, content_type, filename) tuple.
    """
    reply = EmailMessage()
    reply["From"] = user
    reply["To"] = str(original.get("Reply-To") or original.get("From") or user)
    subject = str(original.get("Subject") or "")
    reply["Subject"] = subject if subject.lower().startswith("re:") else f"Re: {subject}"
    original_id = original.get("Message-ID")
    if original_id:
        reply["In-Reply-To"] = original_id
        references = str(original.get("References") or "").strip()
        reply["References"] = f"{references} {original_id}".strip()
    reply[BOT_HEADER] = "1"
    reply.set_content(body)

    if attachment is not None:
        data, content_type, filename = attachment
        maintype, _, subtype = content_type.partition("/")
        reply.add_attachment(
            data, maintype=maintype, subtype=subtype or "octet-stream",
            filename=filename,
        )

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=60) as smtp:
        smtp.login(user, password)
        smtp.send_message(reply)


def handle_message(user, password, raw_message):
    msg = email.message_from_bytes(raw_message, policy=email.policy.default)

    if msg.get(BOT_HEADER):
        log.info("Skipping the bot's own reply (loop prevention)")
        return

    subject = str(msg.get("Subject") or "(no subject)")
    log.info("Processing message: %r", subject)

    try:
        url = extract_first_url(msg)
        if not url:
            raise ProcessingError("No link was found in the message body.")
        log.info("Found link: %s", url)

        data, content_type = download_image(url)
        filename = attachment_filename(url, content_type)
        send_reply(
            user,
            password,
            msg,
            f"Here is your image ({len(data)} bytes), downloaded from:\n{url}",
            attachment=(data, content_type, filename),
        )
        log.info("Replied with attachment %s (%d bytes)", filename, len(data))
    except ProcessingError as exc:
        log.error("Could not process %r: %s", subject, exc)
        send_reply(
            user,
            password,
            msg,
            f"mail-image-bot could not process your message:\n\n{exc}",
        )
        log.info("Sent failure notice for %r", subject)


def process_unseen(client, user, password):
    uids = client.search(["UNSEEN"])
    if not uids:
        return
    log.info("Found %d unseen message(s)", len(uids))
    fetched = client.fetch(uids, ["BODY.PEEK[]"])
    for uid in sorted(fetched):
        raw = fetched[uid].get(b"BODY[]")
        # Mark seen before processing so a crash cannot re-send replies for
        # the same message on restart.
        client.add_flags([uid], [SEEN])
        if raw is None:
            log.warning("UID %s had no body; skipping", uid)
            continue
        try:
            handle_message(user, password, raw)
        except Exception:
            log.exception("Unexpected error while handling UID %s", uid)


def run(user, password):
    with IMAPClient(IMAP_HOST, ssl=True) as client:
        client.login(user, password)
        client.select_folder("INBOX")
        log.info("Connected to %s as %s", IMAP_HOST, user)

        # Drain the backlog that accumulated while the service was down,
        # then switch to event-driven IDLE.
        process_unseen(client, user, password)
        log.info("Backlog processed; entering IDLE mode")

        while True:
            client.idle()
            deadline = time.monotonic() + IDLE_RENEW_SECONDS
            activity = False
            while True:
                remaining = deadline - time.monotonic()
                if remaining <= 0:
                    break
                responses = client.idle_check(
                    timeout=min(IDLE_POLL_SECONDS, remaining)
                )
                if responses:
                    activity = True
                    break
            client.idle_done()
            if activity:
                log.info("IDLE activity received")
            else:
                log.debug("Renewing IDLE connection")
            # Always re-check UNSEEN after leaving IDLE: this both handles
            # the activity we saw and closes the race window for mail that
            # arrived while we were not idling.
            process_unseen(client, user, password)


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        stream=sys.stdout,
    )

    user = os.environ.get("EMAIL_USER")
    password = os.environ.get("EMAIL_PASS")
    if not user or not password:
        log.critical(
            "EMAIL_USER and EMAIL_PASS must be set "
            "(see /opt/mail-image-bot/mail-image-bot.env)"
        )
        sys.exit(1)

    backoff = 5
    while True:
        started = time.monotonic()
        try:
            run(user, password)
        except Exception:
            if time.monotonic() - started > 120:
                backoff = 5  # the connection was healthy for a while
            log.exception("Connection error; reconnecting in %d seconds", backoff)
            time.sleep(backoff)
            backoff = min(backoff * 2, 300)


if __name__ == "__main__":
    main()
