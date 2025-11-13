"""
RAG Example Package
דוגמה פשוטה למערכת Retrieval-Augmented Generation
"""

__version__ = "1.0.0"
__author__ = "Claude"

from .vector_store import SimpleVectorStore
from .rag_engine import RAGEngine

__all__ = ["SimpleVectorStore", "RAGEngine"]
