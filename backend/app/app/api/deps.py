from app.db.client import client


def get_db():
    return client.movies
