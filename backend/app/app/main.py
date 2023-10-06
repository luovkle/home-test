import os

import requests
from fastapi import FastAPI

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

app = FastAPI()


# List movies sorted by popularity
@app.get("/discover")
def discover(page: int):
    response = requests.get(
        api_url + f"/3/discover/movie?page={page}&sort_by=popularity.desc",
        headers=headers,
    )
    return {"response": response.json()}


# Search movies by title
@app.get("/search")
def search(title: str):
    response = requests.get(
        api_url + f"/3/search/movie?query={title}",
        headers=headers,
    )
    return {"response": response.json()}
