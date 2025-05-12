import os
from datetime import datetime

from courses.lessons.dao import LessonDAO
from courses.lessons.schemas import SLessonCreate, SLesson
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File

from users.dependencies import get_current_user

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)


@router.post("/", response_model=SLesson)
async def create_lesson(
        lesson_data: SLessonCreate,
        video: UploadFile = File(...),
        current_user=Depends(get_current_user)
):
    os.makedirs("static/lessons", exist_ok=True)
    video_path = f"static/lessons/{video.filename}"

    with open(video_path, "wb") as buffer:
        buffer.write(await video.read())

    lesson = await LessonDAO.add(
        **lesson_data.dict(),
        video_url=video_path,
        created_at=datetime.utcnow()
    )
    return lesson


@router.get("/{lesson_id}", response_model=SLesson)
async def get_lesson(lesson_id: int):
    lesson = await LessonDAO.find_by_id(lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    return lesson
