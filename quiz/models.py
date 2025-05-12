from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from database import Base


class Quiz(Base):
    __tablename__ = 'quizzes'

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey('lessons.id'))
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)
    question = Column(Text, nullable=False)
    question_type = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class QuizAnswer(Base):
    __tablename__ = 'quiz_answers'

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'), nullable=False)
    text = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
