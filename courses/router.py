from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from courses.dao import CourseDAO
from courses.schemas import SCourseCreate, SCourse
from users.dependencies import get_current_user
from datetime import datetime
import os

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.post("/", response_model=SCourse)
async def create_course(
        course_data: SCourseCreate,
        current_user=Depends(get_current_user)
):
    course = await CourseDAO.add(
        **course_data.dict(),
        author_id=current_user.id,
        created_at=datetime.utcnow()
    )
    return course


@router.get("/{course_id}", response_model=SCourse)
async def get_course(course_id: int):
    course = await CourseDAO.find_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course


@router.post("/{course_id}/upload-cover")
async def upload_course_cover(
        course_id: int,
        file: UploadFile = File(...),
        current_user=Depends(get_current_user)
):
    course = await CourseDAO.find_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    os.makedirs("static/covers", exist_ok=True)
    file_path = f"static/covers/{course_id}_{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    await CourseDAO.update(course_id, cover_url=file_path)
    return {"message": "Cover uploaded successfully"}
