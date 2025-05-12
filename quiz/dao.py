from dao.base import BaseDAO

from quiz.models import Quiz, QuizAnswer


class QuizDAO(BaseDAO):
    model = Quiz


class QuizAnswerDAO(BaseDAO):
    model = QuizAnswer
