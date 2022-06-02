FROM node:16-alpine AS test-stage

WORKDIR /usr/src/app
COPY . .
RUN npm ci && CI=true npm run test

FROM test-stage as build-stage
COPY . .
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL=${BACKEND_URL}
RUN npm ci && npm run build 
# & npm install -g serve CMD [ "serve", "-s", "build", "-p", "3000" ]

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html