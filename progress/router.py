from fastapi import APIRouter, Depends, HTTPException
from progress.dao import UserProgressDAO
from progress.schemas import SUserProgressCreate, SUserProgress
from users.dependencies import get_current_user

router = APIRouter(
    prefix="/progress",
    tags=["User Progress"]
)


@router.post("/", response_model=SUserProgress)
async def track_progress(
        progress_data: SUserProgressCreate,
        current_user=Depends(get_current_user)
):
    progress = await UserProgressDAO.add(
        user_id=current_user.id,
        **progress_data.dict()
    )
    return progress


@router.get("/{user_id}/lessons/{lesson_id}", response_model=SUserProgress)
async def get_progress(
        user_id: int,
        lesson_id: int,
        current_user=Depends(get_current_user)
):
    if user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    progress = await UserProgressDAO.find_one_or_none(
        user_id=user_id,
        lesson_id=lesson_id
    )
    return progress