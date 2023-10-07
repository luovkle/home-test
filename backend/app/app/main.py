from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.api import api_router
from app.db.client import client

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.include_router(api_router)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.on_event("shutdown")
def shutdown_event():
    client.close()
