from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, validator


class SUserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str = Field(..., min_length=2, max_length=100)

    @validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v


class SUserPublic(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class SUserAuth(BaseModel):
    email: EmailStr
    full_name: str
    password: str = Field(min_length=6)


class SUserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None


class SUserCreate(SUserBase):
    hashed_password: str


class SUser(SUserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
