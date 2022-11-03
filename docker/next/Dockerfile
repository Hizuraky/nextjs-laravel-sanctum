ARG NODE_VERSION=16

FROM node:$NODE_VERSION-alpine3.15

ENV TZ Asia/Tokyo

WORKDIR /app

COPY ./ ./
RUN apk update && apk add bash
