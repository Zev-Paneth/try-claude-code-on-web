#!/usr/bin/env python3
"""
Script to download media (images/videos) from URL and send via email.
Uses yt-dlp for robust downloading from many websites.
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

# Configuration
GMAIL_ADDRESS = "zevpaneth@gmail.com"
GMAIL_APP_PASSWORD = "jynnevfnmgrffaaw"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Gmail attachment size limit (25MB)
MAX_FILE_SIZE = 25 * 1024 * 1024

# Supported media types
SUPPORTED_IMAGES = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
SUPPORTED_VIDEOS = {'.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v'}
SUPPORTED_MEDIA = SUPPORTED_IMAGES | SUPPORTED_VIDEOS


def is_direct_media_url(url: str) -> bool:
    """Check if URL is a direct link to a media file."""
    lower_url = url.lower().split('?')[0]  # Remove query params
    return any(lower_url.endswith(ext) for ext in SUPPORTED_MEDIA)


def download_with_requests(url: str, temp_dir: str) -> str:
    """Download direct media files using requests."""
    print("📥 מוריד קובץ ישיר...")

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.google.com/'
    }

    response = requests.get(url, headers=headers, stream=True, timeout=60)
    response.raise_for_status()

    # Get filename from URL
    filename = os.path.basename(url.split('?')[0])
    if not filename:
        filename = 'media.jpg'

    filepath = os.path.join(temp_dir, filename)

    with open(filepath, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    return filepath


def download_with_ytdlp(url: str, temp_dir: str) -> str:
    """Download media using yt-dlp (supports many websites)."""
    print("📥 מוריד באמצעות yt-dlp...")

    # yt-dlp options
    ydl_opts = {
        'outtmpl': os.path.join(temp_dir, '%(title)s.%(ext)s'),
        'format': 'best[filesize<25M]/best',  # Prefer files under 25MB
        'quiet': False,
        'no_warnings': False,
        'extract_flat': False,
        # Limit file size for Gmail
        'max_filesize': MAX_FILE_SIZE,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            # Find the downloaded file
            if info:
                # Try to get the filename from info
                if 'requested_downloads' in info:
                    filepath = info['requested_downloads'][0]['filepath']
                else:
                    # Search for downloaded file in temp dir
                    files = glob.glob(os.path.join(temp_dir, '*'))
                    if files:
                        filepath = max(files, key=os.path.getctime)
                    else:
                        raise Exception("לא נמצא קובץ שהורד")

                return filepath
            else:
                raise Exception("yt-dlp לא הצליח לחלץ מידע")

    except yt_dlp.utils.DownloadError as e:
        raise Exception(f"שגיאת הורדה: {e}")


def download_file(url: str) -> tuple[bytes, str]:
    """
    Download file from URL using the best method.
    Returns: (file_content, filename)
    """
    print(f"🔗 URL: {url}\n")

    with tempfile.TemporaryDirectory() as temp_dir:
        # Choose download method
        if is_direct_media_url(url):
            filepath = download_with_requests(url, temp_dir)
        else:
            # Use yt-dlp for complex URLs (YouTube, Twitter, Instagram, etc.)
            filepath = download_with_ytdlp(url, temp_dir)

        # Read the file
        filename = os.path.basename(filepath)
        file_size = os.path.getsize(filepath)

        print(f"\n📁 שם הקובץ: {filename}")
        print(f"📊 גודל: {file_size / (1024*1024):.2f} MB")

        # Check file size
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

    # Create message
    msg = MIMEMultipart()
    msg['From'] = GMAIL_ADDRESS
    msg['To'] = GMAIL_ADDRESS
    msg['Subject'] = f"קובץ מדיה: {filename}"

    # Email body
    body = f"""קובץ מדיה שהורד מהכתובת:
{source_url}

שם הקובץ: {filename}
גודל: {len(file_content) / (1024*1024):.2f} MB
"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    # Attach file
    attachment = MIMEBase('application', 'octet-stream')
    attachment.set_payload(file_content)
    encoders.encode_base64(attachment)
    attachment.add_header(
        'Content-Disposition',
        f'attachment; filename="{filename}"'
    )
    msg.attach(attachment)

    # Send email
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
        description='הורדת מדיה מ-URL ושליחה למייל (תומך ב-YouTube, Twitter, Instagram ועוד)'
    )
    parser.add_argument(
        'url',
        nargs='?',
        help='URL של התמונה או הסרטון'
    )

    args = parser.parse_args()

    # Get URL from argument or ask user
    url = args.url
    if not url:
        url = input("הכנס URL של תמונה או סרטון: ").strip()

    if not url:
        print("❌ לא הוזן URL!")
        sys.exit(1)

    # Validate URL
    if not url.startswith(('http://', 'https://')):
        print("❌ URL לא תקין! חייב להתחיל ב-http:// או https://")
        sys.exit(1)

    try:
        # Download file
        file_content, filename = download_file(url)

        # Send email
        send_email(file_content, filename, url)

        print("\n🎉 הפעולה הושלמה בהצלחה!")

    except Exception as e:
        print(f"\n{e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
