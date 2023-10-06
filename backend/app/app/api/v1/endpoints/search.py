import os

import requests
from fastapi import APIRouter

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

router = APIRouter()


# Search movies by title
@router.get("")
def search(title: str):
    response = requests.get(
        api_url + f"/3/search/movie?query={title}",
        headers=headers,
    )
    return {"response": response.json()}
