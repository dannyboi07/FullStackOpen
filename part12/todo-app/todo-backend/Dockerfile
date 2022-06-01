FROM node:lts-gallium@sha256:1817bb941c9a30fe2a6d75ff8675a8f6def408efe3d3ff43dbb006e2b534fa14

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV debug=todo:*

USER node

CMD npm start