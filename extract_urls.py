#!/usr/bin/env python3
"""
Extract all media URLs from a Wikimedia Commons page.
Works with Category pages, search results, etc.
"""

import sys
import re
import argparse
import requests
from urllib.parse import urljoin, unquote

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

MEDIA_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.webm', '.mp4', '.ogv', '.ogg', '.svg'}


def extract_file_urls(page_url: str) -> list[str]:
    """Extract all File: URLs from a Wikimedia page."""
    print(f"🔍 מחפש קבצים בדף: {page_url}\n")

    try:
        response = requests.get(page_url, headers=HEADERS, timeout=30)
        response.raise_for_status()
    except Exception as e:
        print(f"❌ שגיאה בטעינת הדף: {e}")
        return []

    html = response.text

    # Find all File: links
    # Pattern matches /wiki/File:something.ext
    pattern = r'/wiki/File:([^"\'<>\s]+\.(?:' + '|'.join(ext[1:] for ext in MEDIA_EXTENSIONS) + r'))'
    matches = re.findall(pattern, html, re.IGNORECASE)

    # Remove duplicates and create full URLs
    seen = set()
    file_urls = []

    for filename in matches:
        filename = unquote(filename)
        if filename not in seen:
            seen.add(filename)
            full_url = f"https://commons.wikimedia.org/wiki/File:{filename}"
            file_urls.append(full_url)

    return file_urls


def get_direct_url(file_page_url: str) -> str | None:
    """Get direct CDN URL for a Wikimedia file page."""
    try:
        # Use Wikimedia API to get direct URL
        filename = file_page_url.split('/wiki/File:')[-1]
        api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles=File:{filename}&prop=imageinfo&iiprop=url&format=json"

        response = requests.get(api_url, headers=HEADERS, timeout=10)
        data = response.json()

        pages = data.get('query', {}).get('pages', {})
        for page_id, page_data in pages.items():
            if 'imageinfo' in page_data:
                return page_data['imageinfo'][0]['url']
    except:
        pass

    return None


def main():
    parser = argparse.ArgumentParser(
        description='חילוץ URLs של מדיה מדף Wikimedia Commons'
    )
    parser.add_argument(
        'url',
        help='URL של דף Wikimedia (קטגוריה, חיפוש, וכו\')'
    )
    parser.add_argument(
        '--direct', '-d',
        action='store_true',
        help='להציג URLs ישירים (CDN) במקום דפי File'
    )
    parser.add_argument(
        '--limit', '-l',
        type=int,
        default=50,
        help='מספר מקסימלי של תוצאות (ברירת מחדל: 50)'
    )
    parser.add_argument(
        '--videos-only', '-v',
        action='store_true',
        help='רק קבצי וידאו'
    )
    parser.add_argument(
        '--images-only', '-i',
        action='store_true',
        help='רק קבצי תמונה'
    )

    args = parser.parse_args()

    # Get file URLs
    file_urls = extract_file_urls(args.url)

    if not file_urls:
        print("❌ לא נמצאו קבצי מדיה בדף")
        sys.exit(1)

    # Filter by type
    if args.videos_only:
        video_exts = {'.webm', '.mp4', '.ogv', '.ogg'}
        file_urls = [u for u in file_urls if any(u.lower().endswith(ext) for ext in video_exts)]
    elif args.images_only:
        image_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
        file_urls = [u for u in file_urls if any(u.lower().endswith(ext) for ext in image_exts)]

    # Limit results
    file_urls = file_urls[:args.limit]

    print(f"📋 נמצאו {len(file_urls)} קבצים:\n")

    for i, url in enumerate(file_urls, 1):
        if args.direct:
            direct_url = get_direct_url(url)
            if direct_url:
                print(f"{i}. {direct_url}")
            else:
                print(f"{i}. {url} (לא ניתן למצוא URL ישיר)")
        else:
            print(f"{i}. {url}")

    print(f"\n✅ סה\"כ: {len(file_urls)} קבצים")


if __name__ == "__main__":
    main()
