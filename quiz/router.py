from fastapi import APIRouter, Depends, HTTPException, status
from quiz.dao import QuizDAO, QuizAnswerDAO
from quiz.schemas import SQuizCreate, SQuizAnswerCreate, SQuiz
from users.dependencies import get_current_user

router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)


@router.post("/", response_model=SQuiz)
async def create_quiz(
        quiz_data: SQuizCreate,
        current_user=Depends(get_current_user)
):
    quiz = await QuizDAO.add(**quiz_data.dict())
    return quiz


@router.post("/{quiz_id}/answers")
async def add_answer(
        quiz_id: int,
        answer_data: SQuizAnswerCreate,
        current_user=Depends(get_current_user)
):
    quiz = await QuizDAO.find_by_id(quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    await QuizAnswerDAO.add(quiz_id=quiz_id, **answer_data.dict())
    return {"message": "Answer added successfully"}


@router.get("/{quiz_id}", response_model=SQuiz)
async def get_quiz(quiz_id: int):
    quiz = await QuizDAO.find_by_id(quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz
