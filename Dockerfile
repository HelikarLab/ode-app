FROM statebait/python-libsbml:with-stimator

# Install pydash
RUN pip3 install pydash

# Install Node, yarn and bash
RUN apk add --no-cache nodejs yarn bash git

# Set the work directory
WORKDIR /usr/src/app

# Copy the required files
COPY . .

# Install the dependencies of the server and build the server
RUN yarn \
  && cd server \
  && yarn build

# Prepare the build folder
RUN cp server/build/. build/ -R \
  && cp client/build build/public -R 

# Delete unnecessary files
RUN rm cypress -rf \
  && rm client -rf \
  && rm server -rf 

# Expose port 5000
EXPOSE 5000