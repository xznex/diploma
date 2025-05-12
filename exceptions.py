from fastapi import HTTPException, status


class UserException(HTTPException):
    status_code = 500
    detail = ""

    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)


class UserAlreadyExistsException(UserException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Пользователь уже существует"


class IncorrectEmailOrPasswordException(UserException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Неверная почта или пароль"


class TokenExpiredException(UserException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "У вас истек токен"


class TokenAbsentException(UserException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Токен отсутствует"


class IncorrectTokenFormatException(UserException):
    status_code = status.HTTP_401_UNAUTHORIZED
    detail = "Неверный формат токена"


class UserIsNotPresentException(UserException):
    status_code = status.HTTP_401_UNAUTHORIZED


class RoomCannotBeBooked(UserException):
    status_code = status.HTTP_409_CONFLICT
    detail = "Не осталось свободных номеров"
