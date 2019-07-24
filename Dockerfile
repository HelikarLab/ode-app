FROM statebait/python-libsbml:with-stimator

RUN apk add --no-cache nodejs yarn bash

WORKDIR /usr/src/app/server

COPY . .
RUN cp client/build server/public -R && rm client -rf
# RUN cd server && ls -a 
RUN yarn

EXPOSE 5000