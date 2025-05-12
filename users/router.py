from fastapi import APIRouter, Response, Depends, status

from exceptions import UserAlreadyExistsException, IncorrectEmailOrPasswordException
from users.auth import get_password_hash, authenticate_user, create_access_token
from users.dao import UserDAO
from users.dependencies import get_current_user
from users.models import User

from users.schemas import SUserAuth, SUser


router = APIRouter(
    prefix="/auth",
    tags=["Auth & Пользователи"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_data: SUserAuth):
    exising_user = await UserDAO.find_one_or_none(email=user_data.email)
    if exising_user:
        raise UserAlreadyExistsException
    hashed_password = get_password_hash(user_data.password)
    await UserDAO.add(email=user_data.email, hashed_password=hashed_password, full_name=user_data.full_name)


@router.post("/login")
async def login_user(response: Response, user_data: SUserAuth):
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        raise IncorrectEmailOrPasswordException
    access_token = create_access_token({"sub": str(user.id)})
    response.set_cookie("learning_access_token", access_token, httponly=True)
    return {"access_token": access_token}


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("learning_access_token")


@router.get("/me", response_model=SUser)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
