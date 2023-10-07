import requests
from fastapi import APIRouter, WebSocket

from app.core.config import settings

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}

router = APIRouter()


# Search movies by title
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        title = await websocket.receive_text()
        response = requests.get(
            api_url + f"/3/search/movie?query={title}",
            headers=headers,
        )
        await websocket.send_json(response.json())
