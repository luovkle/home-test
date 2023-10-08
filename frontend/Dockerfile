FROM node:19-alpine as app-deps
RUN yarn global add pnpm
WORKDIR /app
COPY ["./app/package.json", "./app/pnpm-lock.yaml", "/app/"]
RUN pnpm i --frozen-lockfile

FROM node:19-alpine AS app-builder
WORKDIR /app
COPY --from=app-deps ["/app/node_modules", "/app/node_modules/"]
COPY [ \
  "./app/package.json", \
  "./app/index.html", \
  "./app/tsconfig.json", \
  "./app/tsconfig.node.json", \
  "./app/vite.config.ts", \
  "./app/postcss.config.js", \
  "./app/tailwind.config.js", \
  "/app/" \
]
ADD ["./app/src", "/app/src/"]
ARG VITE_BACKEND_HOST
ENV VITE_BACKEND_HOST=${VITE_BACKEND_HOST}
RUN yarn run build

FROM nginx:1.25-alpine as app-runner
COPY --from=app-builder /app/dist /usr/share/nginx/html
