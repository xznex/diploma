from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_HOST: str = Field(validation_alias="DB_HOST")
    DB_PORT: int = Field(validation_alias="DB_PORT")
    DB_USER: str = Field(validation_alias="DB_USER")
    DB_PASS: str = Field(validation_alias="DB_PASS")
    DB_NAME: str = Field(validation_alias="DB_NAME")
    SECRET_KEY: str = Field(validation_alias="SECRET_KEY")
    ALGORITHM: str = Field(validation_alias="ALGORITHM")

    # SMTP_HOST: str = Field(validation_alias="SMTP_HOST")
    # SMTP_PORT: str = Field(validation_alias="SMTP_PORT")
    # SMTP_USER: str = Field(validation_alias="SMTP_USER")
    # SMTP_PASS: str = Field(validation_alias="SMTP_PASS")

    # REDIS_HOST: str = Field(validation_alias="REDIS_HOST")
    # REDIS_PORT: str = Field(validation_alias="REDIS_PORT")

    @computed_field
    @property
    def DATABASE_URL(self) -> str:
        return f'postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')


settings = Settings()
# print(settings.DATABASE_URL)
