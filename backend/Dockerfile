FROM python:3.11-alpine as app-deps
RUN pip install pipenv
WORKDIR /app
ENV PIPENV_VENV_IN_PROJECT=1
COPY ["./app/Pipfile", "./app/Pipfile.lock", "/app/"]
RUN pipenv install

FROM app-deps as app-runner
WORKDIR /app
COPY --from=app-deps ["/app/.venv", "/app/.venv/"]
COPY ["./app/app/", "/app/app/"]
CMD ["pipenv", "run", "prod"]
