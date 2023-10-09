# Home Test

## Requirements

To run app locally, you need the following:

- Git
- Docker Compose (19.03.0+)
- Python (3.11)
- Pipenv (2023.9.8)
- Node.js (v20.6.1)
- Pnpm (8.7.5)

## Clone repo

```sh
git clone https://github.com/luovkle/home-test
cd home-test
```

## Set Environment Variables

**Note for Docker Users:** If you plan to run this application with Docker, you will need to configure environment variables with a private IP address. You can obtain your private IP address using commands such as `ifconfig` on Linux or `ipconfig` on Windows. Please follow the steps below to set up these environment variables:

### MongoDB

Navigate to the mongo directory

Copy the .env.sample file to a new file named .env

```sh
cd mongo
cp .env.sample .env
```

Ensure that the newly created .env file follows this structure:

```txt
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
```

Example:

```txt
MONGO_INITDB_ROOT_USERNAME=usr
MONGO_INITDB_ROOT_PASSWORD=pwd
```

### Backend

Navigate to the backend/app directory.

Copy the .env.sample file to a new file named .env.

```sh
cd backend/app
cp .env.sample .env
```

Ensure that the newly created .env file follows this structure:

```txt
# App
APP_ALLOW_ORIGINS=

# TMDB
TMDB_ACCESS_TOKEN=

# MongoDB
MONGO_URI=
```

Example:

```txt
# App
APP_ALLOW_ORIGINS=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost", "http://127.0.0.1"]

# TMDB
TMDB_ACCESS_TOKEN=SECRET

# MongoDB
MONGO_URI=mongodb://usr:pwd@192.168.0.1:27017
```

### Frontend

Navigate to the frontend/app directory.

Copy the .env.sample file to a new file named .env.

```sh
cd frontend/app
cp .env.sample .env
```

Ensure that the newly created .env file follows this structure:

```txt
VITE_BACKEND_HOST=
```

Example:

```txt
VITE_BACKEND_HOST=192.168.0.1
```

## Running Application

You can run the application using Docker for a simplified deployment process.

### With Docker

Before running the application with Docker, make sure to set the Vite variable for the backend host:

```sh
export VITE_BACKEND_HOST=192.168.0.1
```

This ensures that the frontend knows where to communicate with the backend.

Next, use the following command to start the application using Docker Compose in production mode:

```sh
docker compose -f docker-compose.prod.yml up -d --build
```

This command will build and start the containers needed for your application in detached mode (-d), allowing it to run in the background.

### With Pipenv and Pnpm

If you prefer to run the application without Docker, you can set it up manually.

## Backend

Navigate to the backend/app directory.

Install the Python dependencies using Pipenv:

```sh
cd backend/app
pipenv install
```

Start the backend server in development mode:

```sh
pipenv run dev
```

## Frontend

Navigate to the frontend/app directory.

Install the JavaScript dependencies using Pnpm:

```sh
cd frontend/app
pnpm install
```

Start the frontend development server:

```sh
pnpm dev --port 3000
```

## MongoDB (with Docker)

If you choose to use Docker for MongoDB, you can run the following command to start a MongoDB container:

```sh
docker run --rm --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=usr -e MONGO_INITDB_ROOT_PASSWORD=pwd mongo:4.4.18-rc0-focal
```

This command will set up a MongoDB container with the specified credentials. However, you are free to use an external MongoDB database if you prefer.
