FROM statebait/python-libsbml:with-stimator

RUN apk add --no-cache nodejs yarn bash

WORKDIR /usr/src/app/server

COPY . .

EXPOSE 5000
RUN yarn