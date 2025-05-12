from dao.base import BaseDAO

from courses.lessons.models import Lesson


class LessonDAO(BaseDAO):
    model = Lesson
