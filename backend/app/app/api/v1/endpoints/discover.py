import requests
from fastapi import APIRouter

from app.core.config import settings

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}

router = APIRouter()


# List movies sorted by popularity
@router.get("")
def discover(page: int):
    response = requests.get(
        api_url + f"/3/discover/movie?page={page}&sort_by=popularity.desc",
        headers=headers,
    )
    return {"response": response.json()}
