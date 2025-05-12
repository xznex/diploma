from enum import Enum
from typing import Optional

from pydantic import BaseModel

from courses.lessons.schemas import SLesson


class QuestionType(str, Enum):
    single_choice = "single_choice"
    multiple_choice = "multiple_choice"
    text_answer = "text_answer"


class SQuizBase(BaseModel):
    question: str
    question_type: QuestionType
    explanation: Optional[str] = None


class SQuizCreate(SQuizBase):
    lesson_id: Optional[int] = None
    course_id: int


class SQuiz(SQuizBase):
    id: int
    lesson_id: Optional[int]
    course_id: int
    lesson: Optional[SLesson] = None

    class Config:
        from_attributes = True


class SQuizAnswerBase(BaseModel):
    text: str
    is_correct: bool = False


class SQuizAnswerCreate(SQuizAnswerBase):
    quiz_id: int


class SQuizAnswer(SQuizAnswerBase):
    id: int
    quiz_id: int

    class Config:
        from_attributes = True
