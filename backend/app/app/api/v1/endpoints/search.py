import requests
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.config import settings

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)


manager = ConnectionManager()

router = APIRouter()


# Search movies by title
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            title = await websocket.receive_text()
            response = requests.get(
                api_url + f"/3/search/movie?query={title}",
                headers=headers,
            )
            await manager.send(response.json(), websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
