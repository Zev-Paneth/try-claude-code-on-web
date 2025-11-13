"""
דוגמה לשימוש במערכת RAG
מדגים איך להוסיף ידע ולבצע שאילתות
"""
from vector_store import SimpleVectorStore
from rag_engine import RAGEngine


def main():
    print("=" * 70)
    print("דוגמה למערכת RAG (Retrieval-Augmented Generation)")
    print("=" * 70)
    print()

    # יצירת מחסן ווקטורים
    vector_store = SimpleVectorStore()

    # יצירת מנוע RAG
    rag = RAGEngine(vector_store)

    print("שלב 1: הוספת ידע למערכת")
    print("-" * 70)

    # הוספת מידע על Python
    documents = [
        {
            "id": "python_basics",
            "text": "Python הוא שפת תכנות ברמה גבוהה, דינמית ומפורשת. היא נוצרה על ידי גווידו ון רוסום ושוחררה לראשונה ב-1991. Python ידועה בתחביר הפשוט והקריא שלה.",
            "metadata": {"category": "basics", "language": "python"}
        },
        {
            "id": "python_uses",
            "text": "Python משמשת למגוון רחב של יישומים כולל פיתוח אתרים, ניתוח נתונים, בינה מלאכותית, למידת מכונה, אוטומציה ועוד. היא פופולרית מאוד בקהילת המדע והנתונים.",
            "metadata": {"category": "applications", "language": "python"}
        },
        {
            "id": "python_features",
            "text": "Python תומכת בריבוי פרדיגמות תכנות כולל תכנות מונחה עצמים, תכנות פרוצדורלי ותכנות פונקציונלי. היא כוללת ספריית תקן עשירה מאוד.",
            "metadata": {"category": "features", "language": "python"}
        },
        {
            "id": "python_popularity",
            "text": "Python היא אחת משפות התכנות הפופולריות ביותר בעולם. היא מדורגת בראש הרשימות של שפות תכנות מבוקשות ומשמשת חברות טכנולוגיה מובילות כמו Google, Facebook, Netflix ועוד.",
            "metadata": {"category": "popularity", "language": "python"}
        },
        {
            "id": "machine_learning",
            "text": "Python היא שפת התכנות המועדפת ללמידת מכונה ובינה מלאכותית. ספריות כמו TensorFlow, PyTorch, scikit-learn ו-Keras הפכו את Python לבחירה הסטנדרטית בתחום.",
            "metadata": {"category": "ai_ml", "language": "python"}
        }
    ]

    for doc in documents:
        rag.add_knowledge(doc["id"], doc["text"], doc["metadata"])
        print(f"✓ נוסף מסמך: {doc['id']}")

    print()
    print("שלב 2: ביצוע שאילתות")
    print("-" * 70)
    print()

    # שאילתות לדוגמה
    queries = [
        "למה Python פופולרית?",
        "מה אפשר לעשות עם Python?",
        "מי יצר את Python?"
    ]

    for i, query in enumerate(queries, 1):
        print(f"\nשאילתה {i}: {query}")
        print("=" * 70)

        result = rag.query(query, top_k=2)

        print(f"\nמסמכים שנמצאו ({len(result['retrieved_documents'])}):")
        for j, doc_result in enumerate(result['retrieved_documents'], 1):
            doc = doc_result['document']
            score = doc_result['score']
            print(f"\n  {j}. {doc['id']} (ציון: {score:.3f})")
            print(f"     {doc['text'][:100]}...")

        print("\n" + "=" * 70)
        print()

    # שאילתה מפורטת
    print("\nדוגמה לשאילתה מפורטת:")
    print("=" * 70)
    detailed_query = "מה הקשר בין Python ובינה מלאכותית?"
    result = rag.query(detailed_query, top_k=3)

    print(result['answer'])
    print()


if __name__ == "__main__":
    main()
