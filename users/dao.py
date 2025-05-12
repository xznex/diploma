from dao.base import BaseDAO
from users.models import User
from users.schemas import SUserRegister


class UserDAO(BaseDAO):
    model = User

    @classmethod
    async def create_user(cls, user_data: SUserRegister):
        return await cls.add(
            email=user_data.email,
            hashed_password=user_data.hashed_password,
            full_name=user_data.full_name,
            role="student"  # По умолчанию
        )
