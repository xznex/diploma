from dao.base import BaseDAO
from courses.models import Course


class CourseDAO(BaseDAO):
    model = Course
