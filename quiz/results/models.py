from datetime import datetime
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, Text
from database import Base


class UserQuizResult(Base):
    __tablename__ = 'user_quiz_results'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'), nullable=False)
    score = Column(Float)
    completed_at = Column(DateTime, default=datetime.utcnow)
