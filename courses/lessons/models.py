from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from database import Base


class Lesson(Base):
    __tablename__ = 'lessons'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)
    video_url = Column(String(255))
    duration = Column(Integer)  # in seconds
    order = Column(Integer)  # lesson sequence
    created_at = Column(DateTime, default=datetime.utcnow)
