from pydantic import BaseModel
from typing import List

class FlashcardQA(BaseModel):
    question: str
    answer: str

class FlashcardCreateRequest(BaseModel):
    topic: str

class FlashcardCreateResponse(BaseModel):
    message: str
    flashcards: List[FlashcardQA]