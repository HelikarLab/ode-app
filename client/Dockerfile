FROM node:10.16.0-alpine

WORKDIR /usr/src/app/client

RUN apk add yarn

COPY . .

EXPOSE 3000

RUN yarn
RUN yarn build
