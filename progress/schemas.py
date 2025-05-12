from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from courses.lessons.schemas import SLesson
from users.schemas import SUser


class SUserProgressBase(BaseModel):
    is_completed: bool = False
    progress: float = Field(ge=0, le=1)
    last_watched: Optional[datetime] = None


class SUserProgressCreate(SUserProgressBase):
    lesson_id: int


class SUserProgress(SUserProgressBase):
    id: int
    user_id: int
    lesson_id: int
    updated_at: Optional[datetime] = None
    user: SUser
    lesson: SLesson

    class Config:
        from_attributes = True
