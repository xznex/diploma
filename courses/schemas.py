from datetime import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl, Field

from users.schemas import SUser


class SCourseBase(BaseModel):
    title: str = Field(max_length=100)
    description: Optional[str] = None


class SCourseCreate(SCourseBase):
    pass


class SCourse(SCourseBase):
    id: int
    author_id: int
    is_published: bool
    created_at: datetime
    cover_url: Optional[HttpUrl] = None
    author: SUser

    class Config:
        from_attributes = True
