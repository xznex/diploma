from dao.base import BaseDAO

from quiz.results.models import UserQuizResult


class UserQuizResultDAO(BaseDAO):
    model = UserQuizResult
