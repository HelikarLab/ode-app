FROM statebait/python-libsbml:with-stimator

# Install pydash
RUN pip3 install pydash

# Install Node, yarn and bash
RUN apk add --no-cache nodejs yarn bash

# Set the work directory
WORKDIR /usr/src/app/server

# Copy the required files
COPY . .

# Copy the react client build to the public folder of the server and delete unnecessary files
RUN cp client/build server/public -R && rm client -rf

# Install the dependencies of the server
RUN yarn

# Expose port 5000
EXPOSE 5000