from fastapi import APIRouter, Depends, HTTPException
from quiz.results.dao import UserQuizResultDAO
from quiz.results.schemas import SUserQuizResultCreate, SUserQuizResult
from users.dependencies import get_current_user

router = APIRouter(
    prefix="/quiz-results",
    tags=["Quiz Results"]
)


@router.post("/", response_model=SUserQuizResult)
async def submit_quiz_result(
        result_data: SUserQuizResultCreate,
        current_user=Depends(get_current_user)
):
    result = await UserQuizResultDAO.add(
        user_id=current_user.id,
        **result_data.dict()
    )
    return result


@router.get("/user/{user_id}", response_model=list[SUserQuizResult])
async def get_user_results(
        user_id: int,
        current_user=Depends(get_current_user)
):
    if user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    return await UserQuizResultDAO.find_all(user_id=user_id)