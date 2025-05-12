from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from quiz.schemas import SQuiz
from users.schemas import SUser


class SUserQuizResultBase(BaseModel):
    score: float = Field(ge=0, le=1)
    details: Optional[str] = None


class SUserQuizResultCreate(SUserQuizResultBase):
    quiz_id: int


class SUserQuizResult(SUserQuizResultBase):
    id: int
    user_id: int
    quiz_id: int
    completed_at: datetime
    user: SUser
    quiz: SQuiz

    class Config:
        from_attributes = True
