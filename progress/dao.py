from dao.base import BaseDAO

from progress.models import UserProgress


class UserProgressDAO(BaseDAO):
    model = UserProgress
