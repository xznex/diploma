from datetime import datetime
from sqlalchemy import Column, Integer, Boolean, Float, DateTime, ForeignKey
from database import Base


class UserProgress(Base):
    __tablename__ = 'user_progress'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    lesson_id = Column(Integer, ForeignKey('lessons.id'), nullable=False)
    is_completed = Column(Boolean, default=False)
    progress = Column(Float, default=0.0)
    last_watched = Column(DateTime)
