"""
Vector Store פשוט עבור RAG
מאחסן מסמכים ומבצע חיפוש דמיון בסיסי
"""
from typing import List, Dict, Tuple
import math


class SimpleVectorStore:
    """מחסן וקטורים פשוט המשתמש בחישוב דמיון מילים"""

    def __init__(self):
        self.documents: List[Dict[str, str]] = []

    def add_document(self, doc_id: str, text: str, metadata: Dict = None):
        """
        הוסף מסמך למחסן

        Args:
            doc_id: מזהה ייחודי למסמך
            text: תוכן המסמך
            metadata: מטא-דאטה נוסף (אופציונלי)
        """
        document = {
            "id": doc_id,
            "text": text,
            "metadata": metadata or {}
        }
        self.documents.append(document)

    def _calculate_similarity(self, query: str, document_text: str) -> float:
        """
        חישוב דמיון פשוט בין שאילתה למסמך
        משתמש בשיטה פשוטה של ספירת מילים משותפות

        Args:
            query: שאילתת החיפוש
            document_text: טקסט המסמך

        Returns:
            ציון דמיון (0-1)
        """
        # המרה לאותיות קטנות ופיצול למילים
        query_words = set(query.lower().split())
        doc_words = set(document_text.lower().split())

        # חישוב מילים משותפות
        common_words = query_words.intersection(doc_words)

        if not query_words:
            return 0.0

        # חישוב ציון Jaccard דמיון
        union_words = query_words.union(doc_words)
        similarity = len(common_words) / len(union_words) if union_words else 0.0

        return similarity

    def search(self, query: str, top_k: int = 3) -> List[Dict]:
        """
        חיפוש המסמכים הרלוונטיים ביותר

        Args:
            query: שאילתת החיפוש
            top_k: מספר התוצאות המקסימלי להחזיר

        Returns:
            רשימת מסמכים ממוינים לפי רלוונטיות
        """
        if not self.documents:
            return []

        # חישוב ציון דמיון לכל מסמך
        scored_docs = []
        for doc in self.documents:
            score = self._calculate_similarity(query, doc["text"])
            scored_docs.append({
                "document": doc,
                "score": score
            })

        # מיון לפי ציון (מהגבוה לנמוך)
        scored_docs.sort(key=lambda x: x["score"], reverse=True)

        # החזרת top_k תוצאות
        return scored_docs[:top_k]

    def get_all_documents(self) -> List[Dict]:
        """החזר את כל המסמכים במחסן"""
        return self.documents

    def clear(self):
        """נקה את כל המסמכים מהמחסן"""
        self.documents = []
