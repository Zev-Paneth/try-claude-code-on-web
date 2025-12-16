#!/usr/bin/env python3
"""
Script to download media (images/videos) from URL and send via email.
"""

import sys
import os
import argparse
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from urllib.parse import urlparse, unquote

# Configuration
GMAIL_ADDRESS = "zevpaneth@gmail.com"
GMAIL_APP_PASSWORD = "jynnevfnmgrffaaw"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Gmail attachment size limit (25MB)
MAX_FILE_SIZE = 25 * 1024 * 1024

# Supported media types
SUPPORTED_IMAGES = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
SUPPORTED_VIDEOS = {'.mp4', '.webm', '.mov', '.avi'}
SUPPORTED_MEDIA = SUPPORTED_IMAGES | SUPPORTED_VIDEOS

# Content-Type mappings
MEDIA_CONTENT_TYPES = {
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo',
    'application/octet-stream'  # Sometimes used for binary files
}

# User-Agent to bypass 403 blocks
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/'
}


def get_filename_from_url(url: str, content_type: str = None) -> str:
    """Extract filename from URL or generate one based on content type."""
    parsed = urlparse(url)
    path = unquote(parsed.path)
    filename = os.path.basename(path)

    # If no extension, try to add one based on content type
    if filename and '.' not in filename and content_type:
        ext_map = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
            'image/webp': '.webp',
            'video/mp4': '.mp4',
            'video/webm': '.webm',
            'video/quicktime': '.mov',
            'video/x-msvideo': '.avi',
        }
        ext = ext_map.get(content_type.split(';')[0].strip(), '')
        filename += ext

    # Default filename if none found
    if not filename:
        filename = 'downloaded_media'
        if content_type and 'video' in content_type:
            filename += '.mp4'
        else:
            filename += '.jpg'

    return filename


def download_file(url: str) -> tuple[bytes, str, str]:
    """
    Download file from URL.
    Returns: (file_content, filename, content_type)
    """
    print(f"מוריד מ: {url}")

    try:
        response = requests.get(url, headers=HEADERS, stream=True, timeout=60)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise Exception(f"שגיאה בהורדה: {e}")

    content_type = response.headers.get('Content-Type', 'application/octet-stream')
    content_type_base = content_type.split(';')[0].strip().lower()

    # Check if it's media content
    if content_type_base not in MEDIA_CONTENT_TYPES:
        print(f"⚠️  אזהרה: סוג התוכן ({content_type_base}) לא נראה כמדיה!")
        print("   ממשיך בכל זאת...")

    # Get the content
    content = response.content
    file_size = len(content)

    print(f"גודל הקובץ: {file_size / (1024*1024):.2f} MB")

    # Check file size
    if file_size > MAX_FILE_SIZE:
        raise Exception(f"❌ הקובץ גדול מדי! ({file_size / (1024*1024):.2f} MB > 25 MB)\n   Gmail מגביל קבצים מצורפים ל-25MB.")

    filename = get_filename_from_url(url, content_type)

    # Verify extension is supported
    ext = os.path.splitext(filename)[1].lower()
    if ext and ext not in SUPPORTED_MEDIA:
        print(f"⚠️  אזהרה: סיומת הקובץ ({ext}) לא ברשימת המדיה הנתמכת!")

    print(f"שם הקובץ: {filename}")

    return content, filename, content_type


def send_email(file_content: bytes, filename: str, source_url: str):
    """Send email with file attachment."""
    print(f"\nשולח אימייל ל: {GMAIL_ADDRESS}")

    # Create message
    msg = MIMEMultipart()
    msg['From'] = GMAIL_ADDRESS
    msg['To'] = GMAIL_ADDRESS
    msg['Subject'] = f"קובץ מדיה: {filename}"

    # Email body
    body = f"""קובץ מדיה שהורד מהכתובת:
{source_url}

שם הקובץ: {filename}
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
        description='הורדת מדיה מ-URL ושליחה למייל'
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
        file_content, filename, content_type = download_file(url)

        # Send email
        send_email(file_content, filename, url)

        print("\n🎉 הפעולה הושלמה בהצלחה!")

    except Exception as e:
        print(f"\n{e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
