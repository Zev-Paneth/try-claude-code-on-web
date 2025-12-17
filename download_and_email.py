#!/usr/bin/env python3
"""
Script to download media (images/videos) from URL and send via email.
Uses yt-dlp with browser impersonation and proxy support.

Requirements:
    pip install yt-dlp requests 'curl_cffi>=0.10,<0.14'

Usage:
    # Without proxy (from home computer)
    python download_and_email.py "https://youtube.com/watch?v=..."

    # With proxy (from cloud)
    python download_and_email.py --proxy "http://user:pass@proxy.com:port" "URL"

    # Or set environment variable
    export PROXY_URL="http://user:pass@proxy.com:port"
    python download_and_email.py "URL"
"""

import sys
import os
import argparse
import tempfile
import smtplib
import glob
import yt_dlp
import requests
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

# ============================================
# CONFIGURATION - Edit these values
# ============================================

GMAIL_ADDRESS = "zevpaneth@gmail.com"
GMAIL_APP_PASSWORD = "jynnevfnmgrffaaw"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Proxy configuration (optional)
# Set here or use --proxy argument or PROXY_URL environment variable
# Examples:
#   - Bright Data: "http://username:password@brd.superproxy.io:22225"
#   - IPRoyal: "http://username:password@geo.iproyal.com:12321"
#   - Oxylabs: "http://username:password@pr.oxylabs.io:7777"
PROXY_URL = os.environ.get('PROXY_URL', '')

# ============================================

# Gmail attachment size limit (25MB)
MAX_FILE_SIZE = 25 * 1024 * 1024

# Supported media types
SUPPORTED_IMAGES = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
SUPPORTED_VIDEOS = {'.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v'}
SUPPORTED_MEDIA = SUPPORTED_IMAGES | SUPPORTED_VIDEOS

# Browser impersonation targets
IMPERSONATE_TARGETS = ['chrome', 'firefox', 'safari']


def get_wikimedia_direct_url(wiki_url: str) -> str | None:
    """Convert a Wikimedia File: page URL to direct CDN URL using the API."""
    if '/wiki/File:' not in wiki_url:
        return None

    try:
        # Extract filename from URL
        filename = wiki_url.split('/wiki/File:')[-1].split('?')[0]

        # Use Wikimedia API to get direct URL
        api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles=File:{filename}&prop=imageinfo&iiprop=url&format=json"

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
        }

        response = requests.get(api_url, headers=headers, timeout=10)
        data = response.json()

        pages = data.get('query', {}).get('pages', {})
        for page_id, page_data in pages.items():
            if 'imageinfo' in page_data:
                direct_url = page_data['imageinfo'][0]['url']
                print(f"🔄 המרה ל-URL ישיר: {direct_url[:80]}...")
                return direct_url
    except Exception as e:
        print(f"⚠️ לא ניתן להמיר ל-URL ישיר: {e}")

    return None


def is_direct_media_url(url: str) -> bool:
    """Check if URL is a direct link to a media file (not a page)."""
    lower_url = url.lower().split('?')[0]

    # Wikimedia/Wikipedia page URLs should use yt-dlp, not direct download
    if 'commons.wikimedia.org/wiki/' in lower_url:
        return False
    if 'wikipedia.org/wiki/' in lower_url:
        return False

    # Check if it's a direct media file URL
    return any(lower_url.endswith(ext) for ext in SUPPORTED_MEDIA)


def download_with_requests(url: str, temp_dir: str, proxy: str = None) -> str:
    """Download direct media files using requests with curl_cffi."""
    print("📥 מוריד קובץ ישיר...")

    proxies = {'http': proxy, 'https': proxy} if proxy else None

    # Try using curl_cffi for better compatibility
    try:
        from curl_cffi import requests as curl_requests
        response = curl_requests.get(
            url,
            impersonate="chrome",
            timeout=60,
            proxies=proxies
        )
        response.raise_for_status()
        content = response.content
    except ImportError:
        # Fallback to regular requests
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.google.com/'
        }
        response = requests.get(
            url,
            headers=headers,
            stream=True,
            timeout=60,
            proxies=proxies
        )
        response.raise_for_status()
        content = response.content

    # Get filename from URL
    filename = os.path.basename(url.split('?')[0])
    if not filename:
        filename = 'media.jpg'

    filepath = os.path.join(temp_dir, filename)

    with open(filepath, 'wb') as f:
        f.write(content)

    return filepath


def download_with_ytdlp(url: str, temp_dir: str, proxy: str = None) -> str:
    """Download media using yt-dlp with browser impersonation and proxy."""
    if proxy:
        print(f"📥 מוריד באמצעות yt-dlp (עם proxy + התחזות לדפדפן)...")
    else:
        print("📥 מוריד באמצעות yt-dlp (עם התחזות לדפדפן)...")

    # Base yt-dlp options with browser-like headers
    ydl_opts = {
        'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
        'format': 'best[filesize<25M]/best',
        'quiet': False,
        'no_warnings': False,
        'extract_flat': False,
        'max_filesize': MAX_FILE_SIZE,
        'nocheckcertificate': True,
        'impersonate': 'chrome',
        # Add browser-like headers to bypass blocks
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.google.com/',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        },
    }

    # Add proxy if specified
    if proxy:
        ydl_opts['proxy'] = proxy

    last_error = None

    # Try each impersonation target
    for target in IMPERSONATE_TARGETS:
        ydl_opts['impersonate'] = target
        print(f"   🎭 מנסה התחזות ל-{target}...")

        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)

                if info:
                    if 'requested_downloads' in info:
                        filepath = info['requested_downloads'][0]['filepath']
                    else:
                        files = glob.glob(os.path.join(temp_dir, '*'))
                        if files:
                            filepath = max(files, key=os.path.getctime)
                        else:
                            raise Exception("לא נמצא קובץ שהורד")

                    print(f"   ✅ הצליח עם {target}!")
                    return filepath

        except Exception as e:
            last_error = e
            # Clean temp dir for next attempt
            for f in glob.glob(os.path.join(temp_dir, '*')):
                try:
                    os.remove(f)
                except:
                    pass
            continue

    # If all impersonation attempts failed, try without impersonation
    print("   🔄 מנסה בלי התחזות...")
    ydl_opts.pop('impersonate', None)

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            if info:
                if 'requested_downloads' in info:
                    filepath = info['requested_downloads'][0]['filepath']
                else:
                    files = glob.glob(os.path.join(temp_dir, '*'))
                    if files:
                        filepath = max(files, key=os.path.getctime)
                    else:
                        raise Exception("לא נמצא קובץ שהורד")

                return filepath

    except Exception as e:
        last_error = e

    raise Exception(f"שגיאת הורדה: {last_error}")


def download_file(url: str, proxy: str = None) -> tuple[bytes, str]:
    """
    Download file from URL using the best method.
    Returns: (file_content, filename)
    """
    print(f"🔗 URL: {url}")
    if proxy:
        # Hide password in output
        display_proxy = proxy.split('@')[-1] if '@' in proxy else proxy
        print(f"🌐 Proxy: {display_proxy}")
    print()

    # Try to convert Wikimedia page URLs to direct URLs
    if 'commons.wikimedia.org/wiki/File:' in url:
        direct_url = get_wikimedia_direct_url(url)
        if direct_url:
            url = direct_url

    with tempfile.TemporaryDirectory() as temp_dir:
        if is_direct_media_url(url):
            filepath = download_with_requests(url, temp_dir, proxy)
        else:
            filepath = download_with_ytdlp(url, temp_dir, proxy)

        filename = os.path.basename(filepath)
        file_size = os.path.getsize(filepath)

        print(f"\n📁 שם הקובץ: {filename}")
        print(f"📊 גודל: {file_size / (1024*1024):.2f} MB")

        if file_size > MAX_FILE_SIZE:
            raise Exception(
                f"❌ הקובץ גדול מדי! ({file_size / (1024*1024):.2f} MB > 25 MB)\n"
                "   Gmail מגביל קבצים מצורפים ל-25MB."
            )

        with open(filepath, 'rb') as f:
            content = f.read()

        return content, filename


def send_email(file_content: bytes, filename: str, source_url: str):
    """Send email with file attachment."""
    print(f"\n📧 שולח אימייל ל: {GMAIL_ADDRESS}")

    msg = MIMEMultipart()
    msg['From'] = GMAIL_ADDRESS
    msg['To'] = GMAIL_ADDRESS
    msg['Subject'] = f"קובץ מדיה: {filename}"

    body = f"""קובץ מדיה שהורד מהכתובת:
{source_url}

שם הקובץ: {filename}
גודל: {len(file_content) / (1024*1024):.2f} MB
"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    attachment = MIMEBase('application', 'octet-stream')
    attachment.set_payload(file_content)
    encoders.encode_base64(attachment)
    attachment.add_header(
        'Content-Disposition',
        f'attachment; filename="{filename}"'
    )
    msg.attach(attachment)

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(GMAIL_ADDRESS, GMAIL_APP_PASSWORD)
            server.send_message(msg)
        print("✅ האימייל נשלח בהצלחה!")
    except smtplib.SMTPAuthenticationError:
        raise Exception("❌ שגיאת אימות! בדוק את ה-App Password.")
    except Exception as e:
        raise Exception(f"❌ שגיאה בשליחת האימייל: {e}")


def main():
    parser = argparse.ArgumentParser(
        description='הורדת מדיה מ-URL ושליחה למייל (תומך ב-YouTube, Twitter, Instagram ועוד)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Proxy Examples:
  Bright Data:  http://user:pass@brd.superproxy.io:22225
  IPRoyal:      http://user:pass@geo.iproyal.com:12321
  Oxylabs:      http://user:pass@pr.oxylabs.io:7777

Environment Variable:
  export PROXY_URL="http://user:pass@proxy.com:port"
        """
    )
    parser.add_argument(
        'url',
        nargs='?',
        help='URL של התמונה או הסרטון'
    )
    parser.add_argument(
        '--proxy', '-p',
        help='Residential proxy URL (e.g., http://user:pass@proxy.com:port)'
    )
    parser.add_argument(
        '--no-email',
        action='store_true',
        help='רק להוריד, בלי לשלוח מייל'
    )

    args = parser.parse_args()

    # Get proxy from argument, config, or environment
    proxy = args.proxy or PROXY_URL or None

    url = args.url
    if not url:
        url = input("הכנס URL של תמונה או סרטון: ").strip()

    if not url:
        print("❌ לא הוזן URL!")
        sys.exit(1)

    if not url.startswith(('http://', 'https://')):
        print("❌ URL לא תקין! חייב להתחיל ב-http:// או https://")
        sys.exit(1)

    try:
        file_content, filename = download_file(url, proxy)

        if args.no_email:
            # Save locally instead
            with open(filename, 'wb') as f:
                f.write(file_content)
            print(f"\n💾 הקובץ נשמר: {filename}")
        else:
            send_email(file_content, filename, url)

        print("\n🎉 הפעולה הושלמה בהצלחה!")

    except Exception as e:
        print(f"\n{e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
