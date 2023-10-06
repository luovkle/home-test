import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # TMDB
    TMDB_ACCESS_TOKEN: str = os.getenv("TMDB_ACCESS_TOKEN", "")


settings = Settings()