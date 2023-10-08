import os
import json

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_TITLE: str = "Home Test"
    APP_VERSION: str = "0.0.1"
    APP_DOCS_URL: str | None = "/"
    APP_REDOC_URL: str | None = None
    APP_ALLOW_ORIGINS: list[str] = json.loads(os.getenv("ALLOW_ORIGINS", "[]"))
    APP_ALLOW_HEADERS: list[str] = ["Authorization"]
    APP_ALLOW_METHODS: list[str] = ["GET"]

    # TMDB
    TMDB_ACCESS_TOKEN: str = os.getenv("TMDB_ACCESS_TOKEN", "")

    # MongoDB
    MONGO_URI: str = os.getenv("MONGO_URI", "")


settings = Settings()
