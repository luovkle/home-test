import requests
from fastapi import APIRouter

from app.core.config import settings

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}

router = APIRouter()


# Search movies by title
@router.get("")
def search(title: str):
    response = requests.get(
        api_url + f"/3/search/movie?query={title}",
        headers=headers,
    )
    return {"response": response.json()}
