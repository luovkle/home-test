import requests
from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.database import Database

from app.core.config import settings
from app.api.deps import get_db

api_url = "https://api.themoviedb.org"
headers = {"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}

router = APIRouter()


# List movies sorted by popularity
@router.get("")
def discover(db: Database = Depends(get_db), *, page: int):
    # Check if the document exists in the database for the specified page
    doc = db.discover.find_one({"page": page})
    if not doc:
        # If not found in the database, request data from the external API
        response = requests.get(
            api_url + f"/3/discover/movie?page={page}&sort_by=popularity.desc",
            headers=headers,
        )
        if response.status_code == 200:
            id = db.discover.insert_one(response.json()).inserted_id
            doc = db.discover.find_one({"_id": id})
        # If insertion failed or the response status code is not 200, raise a
        # 404 error.
        if not doc:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    # Remove the "_id" field before returning the document
    doc.pop("_id")
    return {"response": doc}
