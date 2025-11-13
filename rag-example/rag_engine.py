"""
מנוע RAG (Retrieval-Augmented Generation)
משלב חיפוש מידע עם יצירת תשובות
"""
from typing import List, Dict
from vector_store import SimpleVectorStore


class RAGEngine:
    """
    מנוע RAG שמשלב חיפוש (Retrieval) עם יצירת תשובות (Generation)
    """

    def __init__(self, vector_store: SimpleVectorStore):
        """
        אתחול המנוע

        Args:
            vector_store: מחסן הווקטורים לשימוש
        """
        self.vector_store = vector_store

    def _create_context(self, retrieved_docs: List[Dict]) -> str:
        """
        יצירת קונטקסט מהמסמכים שנמצאו

        Args:
            retrieved_docs: רשימת מסמכים שנמצאו בחיפוש

        Returns:
            טקסט קונטקסט משולב
        """
        if not retrieved_docs:
            return "לא נמצא מידע רלוונטי."

        context_parts = []
        for i, result in enumerate(retrieved_docs, 1):
            doc = result["document"]
            score = result["score"]
            context_parts.append(
                f"[מסמך {i} - רלוונטיות: {score:.2f}]\n{doc['text']}"
            )

        return "\n\n".join(context_parts)

    def _generate_response(self, query: str, context: str) -> str:
        """
        יצירת תשובה על בסיס השאילתה והקונטקסט
        בדוגמה זו - מדמה מודל שפה פשוט

        במערכת אמיתית, כאן היינו קוראים ל-LLM API (OpenAI, Anthropic, וכו')

        Args:
            query: שאילתת המשתמש
            context: הקונטקסט שנמצא מהמסמכים

        Returns:
            תשובה שנוצרה
        """
        # בדוגמה זו נחזיר תשובה מובנית
        # במציאות - היינו שולחים את זה למודל שפה אמיתי

        response = f"""
על בסיס המידע שנמצא, הנה התשובה לשאילתה שלך:

שאילתה: {query}

קונטקסט רלוונטי:
{context}

---
הערה: זו דוגמה פשוטה. במערכת אמיתית, כאן היינו משתמשים במודל שפה (LLM)
כמו GPT, Claude וכו' כדי ליצור תשובה חכמה יותר על בסיס הקונטקסט.
"""
        return response

    def query(self, question: str, top_k: int = 3) -> Dict:
        """
        ביצוע שאילתה מלאה ב-RAG:
        1. חיפוש מסמכים רלוונטיים (Retrieval)
        2. יצירת תשובה על בסיס המידע (Augmented Generation)

        Args:
            question: השאילתה של המשתמש
            top_k: מספר מסמכים להחזיר

        Returns:
            תוצאה המכילה את התשובה והמסמכים שנמצאו
        """
        # שלב 1: Retrieval - חיפוש מסמכים רלוונטיים
        retrieved_docs = self.vector_store.search(question, top_k=top_k)

        # שלב 2: יצירת קונטקסט
        context = self._create_context(retrieved_docs)

        # שלב 3: Generation - יצירת תשובה
        response = self._generate_response(question, context)

        # החזרת התוצאה המלאה
        return {
            "question": question,
            "answer": response,
            "retrieved_documents": retrieved_docs,
            "context": context
        }

    def add_knowledge(self, doc_id: str, text: str, metadata: Dict = None):
        """
        הוספת ידע חדש למערכת

        Args:
            doc_id: מזהה המסמך
            text: תוכן המסמך
            metadata: מטא-דאטה
        """
        self.vector_store.add_document(doc_id, text, metadata)
