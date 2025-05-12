from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import date
from typing import Optional

from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from users.router import router as users_router
from courses.router import router as courses_router
from courses.lessons.router import router as lessons_router
from quiz.router import router as quiz_router
from quiz.results.router import router as quiz_results_router
from progress.router import router as progress_router

# from fastapi_cache import FastAPICache
# from fastapi_cache.backends.redis import RedisBackend

# from redis import asyncio as aioredis
# from config import settings


# @asynccontextmanager
# async def lifespan(_: FastAPI) -> AsyncIterator[None]:
#     redis = aioredis.from_url(f"redis://{settings.REDIS_HOST}")
#     FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
#     yield


# lifespan=lifespan
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), "static")

app.include_router(users_router)
app.include_router(courses_router)
app.include_router(lessons_router)
app.include_router(quiz_router)
app.include_router(quiz_results_router)
app.include_router(progress_router)

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Authorization"]
)


# class SHotel(BaseModel):
#     address: str
#     name: str
#     stars: int


# class HotelSearchArgs:
#     def __init__(
#             self,
#             location: str,
#             date_from: date,
#             date_to: date,
#             has_spa: Optional[bool] = None,
#             stars: Optional[int] = Query(None, ge=1, le=5),
#     ):
#         self.location = location
#         self.date_from = date_from
#         self.date_to = date_to
#         self.has_spa = has_spa
#         self.stars = stars


# @app.get('/hotels')
# def get_hotels(args: HotelSearchArgs = Depends()):
#     hotels = [
#         {
#             "address": 'ул. Гагарина, 5',
#             "name": "SuperHotel",
#             "stars": 5
#         }
#     ]
#     return args




# if __name__ == '__main__':
#     uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True)
