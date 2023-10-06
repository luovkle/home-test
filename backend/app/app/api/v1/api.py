from fastapi import APIRouter

from app.api.v1.endpoints.discover import router as discover_router
from app.api.v1.endpoints.search import router as search_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(discover_router, prefix="/discover", tags=["discover"])
api_router.include_router(search_router, prefix="/search", tags=["search"])
