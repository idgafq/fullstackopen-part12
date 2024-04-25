FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY . .
ENV \
  VITE_BACKEND_URI=http://localhost:8080/api \
  VITE_WS_BACKEND_URI=ws://localhost:8080/api
RUN npm ci
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html