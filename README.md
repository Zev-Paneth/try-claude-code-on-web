# mail-image-bot

שירות מונחה-אירועים שרץ על שרת Ubuntu ומחובר לתיבת Gmail בחיבור IMAP IDLE קבוע.
כששולחים מייל לתיבה עם קישור ישיר לתמונה בגוף ההודעה, הבוט מזהה את המייל מיידית,
מוריד את התמונה, ומשיב לאותה שרשרת עם התמונה כקובץ מצורף.

## איך זה עובד

- **חיבור קבוע, לא polling**: IMAP IDLE מול `imap.gmail.com` (ספריית `imapclient`).
  ה-IDLE מתחדש כל 14 דקות (Gmail מנתק אחרי ~29 דקות), וכל שגיאת רשת גוררת
  התחברות מחדש אוטומטית עם backoff.
- **בעליית השירות**: קודם מעובדות כל ההודעות שלא נקראו שהצטברו בזמן שהשירות
  היה כבוי, ורק אז עוברים למצב IDLE.
- **עיבוד הודעה**: רק הודעות UNSEEN. הקישור הראשון מחולץ מגוף ההודעה
  (עדיפות ל-text/plain, נפילה ל-HTML מנוקה מתגיות). ההורדה מתבצעת עם `requests`,
  עם אימות ש-Content-Type הוא `image/*` ומגבלת גודל של 20MB.
- **שליחה**: דרך `smtp.gmail.com` בפורט 465 (SSL), כ-Reply לאותה שרשרת
  (In-Reply-To / References).
- **מניעת לולאה**: כל תשובה של הבוט נושאת את ה-header ‏`X-Mail-Image-Bot: 1`,
  וכל הודעה נכנסת שמכילה אותו מדולגת — כך תשובות שחוזרות ל-inbox (כששולחים
  מהכתובת של עצמך) לא מייצרות לולאה.
- **שגיאות**: אין קישור / הקישור אינו תמונה / ההורדה נכשלה — נשלח מייל תשובה
  עם סיבת הכישלון, והכל נרשם ללוג (journald).

## קבצים

| קובץ | תפקיד |
|---|---|
| `bot.py` | קוד השירות |
| `requirements.txt` | תלויות Python (`imapclient`, `requests`) |
| `mail-image-bot.service` | יחידת systemd‏ (`Restart=always`, לוגים ל-journald) |
| `mail-image-bot.env.example` | תבנית קובץ הסודות |
| `deploy.sh` | התקנה מלאה בפקודה אחת על השרת |

## פריסה על ה-VPS

1. משכו את הריפו לשרת:

   ```bash
   git clone -b claude/mail-image-bot-service-gv2hnp https://github.com/Zev-Paneth/try-claude-code-on-web.git
   cd try-claude-code-on-web
   ```

2. הריצו את סקריפט הפריסה:

   ```bash
   sudo ./deploy.sh
   ```

   הסקריפט מתקין את התלויות, יוצר virtualenv ב-`/opt/mail-image-bot`, מתקין את
   יחידת ה-systemd ומפעיל `enable` (עלייה אוטומטית אחרי ריסטארט) — **ועוצר לפני
   ההפעלה**: הוא מבקש מכם את כתובת ה-Gmail ואת ה-App Password, כותב אותם ל-
   `/opt/mail-image-bot/mail-image-bot.env` בהרשאות 600, ורק לאחר אישורכם מפעיל
   את השירות.

   > **App Password**: נוצר ב-https://myaccount.google.com/apppasswords (דורש
   > אימות דו-שלבי פעיל בחשבון). זו לא סיסמת החשבון הרגילה.

3. מעקב אחרי לוגים:

   ```bash
   journalctl -u mail-image-bot -f
   ```

## בדיקה מקצה לקצה

שלחו מייל מהכתובת שלכם אל עצמכם, עם קישור ישיר לתמונה בגוף ההודעה, למשל:

```
https://picsum.photos/800.jpg
```

בתוך שניות אמורה להגיע תשובה באותה שרשרת עם התמונה כקובץ מצורף. בלוג תראו:
`Found link:` → `Replied with attachment`. אם משהו נכשל (אין קישור, הקישור לא
תמונה, ההורדה נכשלה) — תגיע תשובה עם סיבת הכישלון.

## תפעול

```bash
sudo systemctl status mail-image-bot     # מצב השירות
sudo systemctl restart mail-image-bot    # הפעלה מחדש
journalctl -u mail-image-bot -f          # לוגים חיים
```
