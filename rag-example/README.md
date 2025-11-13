# דוגמה פשוטה ל-RAG (Retrieval-Augmented Generation)

## מה זה RAG?

**RAG** (Retrieval-Augmented Generation) היא טכניקה בתחום הבינה המלאכותית שמשלבת שני מרכיבים:

1. **Retrieval (חיפוש)**: מציאת מידע רלוונטי ממאגר מסמכים
2. **Augmented Generation (יצירה משופרת)**: שימוש במידע שנמצא כדי ליצור תשובות מדויקות יותר

### איך זה עובד?

```
שאילתת משתמש
      ↓
חיפוש במאגר מסמכים (Retrieval)
      ↓
מציאת מסמכים רלוונטיים
      ↓
שילוב המידע עם השאילתה
      ↓
יצירת תשובה (Generation)
      ↓
תשובה סופית למשתמש
```

## מבנה הפרויקט

```
rag-example/
├── vector_store.py    # מחסן וקטורים פשוט לאחסון וחיפוש מסמכים
├── rag_engine.py      # מנוע ה-RAG המשלב חיפוש ויצירת תשובות
├── example.py         # דוגמה מלאה לשימוש במערכת
└── README.md          # קובץ זה
```

## רכיבים במערכת

### 1. Vector Store (מחסן וקטורים)

`vector_store.py` - מחסן פשוט שמאחסן מסמכים ומבצע חיפוש:

- **add_document()**: הוספת מסמך למחסן
- **search()**: חיפוש מסמכים רלוונטיים לשאילתה
- **_calculate_similarity()**: חישוב דמיון בין שאילתה למסמך

### 2. RAG Engine (מנוע RAG)

`rag_engine.py` - המנוע המרכזי שמשלב את כל המרכיבים:

- **query()**: ביצוע שאילתה מלאה (חיפוש + יצירת תשובה)
- **add_knowledge()**: הוספת ידע חדש למערכת
- **_create_context()**: יצירת קונטקסט מהמסמכים שנמצאו
- **_generate_response()**: יצירת תשובה סופית

## איך להריץ את הדוגמה?

```bash
cd rag-example
python example.py
```

## דוגמת שימוש בקוד

```python
from vector_store import SimpleVectorStore
from rag_engine import RAGEngine

# יצירת מחסן ומנוע
vector_store = SimpleVectorStore()
rag = RAGEngine(vector_store)

# הוספת ידע
rag.add_knowledge(
    doc_id="python_info",
    text="Python היא שפת תכנות פופולרית...",
    metadata={"category": "programming"}
)

# ביצוע שאילתה
result = rag.query("מה זה Python?", top_k=3)
print(result['answer'])
```

## יתרונות של RAG

1. **מדויקות**: התשובות מבוססות על מידע ממקורות אמינים
2. **עדכניות**: ניתן להוסיף מידע חדש בקלות ללא צורך באימון מחדש
3. **שקיפות**: ניתן לראות את המקורות שעליהם התשובה מבוססת
4. **חסכוני**: לא צריך לאמן מודלים גדולים על כל הנתונים

## הרחבות אפשריות

במערכת אמיתית ניתן להוסיף:

1. **Vector Embeddings**: שימוש במודלים כמו Sentence-BERT או OpenAI Embeddings
2. **Vector Database**: שימוש ב-Pinecone, Weaviate, או ChromaDB
3. **LLM Integration**: חיבור למודלי שפה כמו GPT-4, Claude, או Llama
4. **Chunking**: פיצול מסמכים ארוכים לחלקים קטנים יותר
5. **Metadata Filtering**: סינון לפי קטגוריות, תאריכים וכו'
6. **Reranking**: דירוג מחדש של תוצאות החיפוש

## ספריות מומלצות לפרודקשן

- **LangChain**: פריימוורק מלא ל-RAG
- **LlamaIndex**: מיוחד באינדקס וחיפוש
- **ChromaDB**: מסד נתונים וקטורי
- **FAISS**: חיפוש דמיון מהיר מאוד
- **Sentence Transformers**: יצירת embeddings

## לימוד נוסף

- [RAG Paper (Original)](https://arxiv.org/abs/2005.11401)
- [LangChain Documentation](https://python.langchain.com/)
- [Pinecone Learning Center](https://www.pinecone.io/learn/)

---

**הערה**: זוהי דוגמה חינוכית פשוטה. במערכת ייצור אמיתית כדאי להשתמש בספריות מוכחות ובמודלי embedding מתקדמים.
