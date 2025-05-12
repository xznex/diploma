from datetime import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl, Field

from courses.schemas import SCourse


class SLessonBase(BaseModel):
    title: str = Field(max_length=100)
    description: Optional[str] = None
    order: int


class SLessonCreate(SLessonBase):
    course_id: int


class SLesson(SLessonBase):
    id: int
    course_id: int
    video_url: Optional[HttpUrl] = None
    duration: Optional[int] = None  # in seconds
    created_at: datetime
    course: SCourse

    class Config:
        from_attributes = True
