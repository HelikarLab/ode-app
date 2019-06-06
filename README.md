# ODE-APP

Web Pipeline For Kinetic (ODE-Based) Models.

## To start the application

This application makes use of docker and docker compose, so first install them. Learn more about this [here](https://www.docker.com/get-started).

Run the following commands to start the application:

```bash
docker-compose build
docker-compose up
```

After this open up a browser and go to http://localhost:3000

## Project Structure

```
 |- client              -> Contains the code of the react client
    |- src              -> Source files of the react client
        |- components   -> React components
        |- store        -> Redux store
 |- server              -> Contains the code of the node server
    |- routes           -> API routes
    |- controllers      -> API controllers
    |- models           -> Sequelize(SQL) models
    |- config           -> Configuration files for the database
    |- sbmlParser.py    -> Python script to parse a SBML file into a JSON object using libsbml
 |- docker-compose.yml  -> Docker Compose files that runs the application using docker
 |- README.md           -> The main documentation file. Also this file :)
```

## Development

Follow the instructions below to get the app up and running in development:

- You need Node & Yarn to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com). Further you also need a server of a postgresql database running. Learn more about postgresql [here](https://www.postgresql.org/).

- First you will need to install the dependencies of the project. Do that by running this:

  - For the client

    ```bash
    cd client
    yarn
    ```

  - For the server

    ```bash
    cd server
    yarn
    ```

- Next you have to setup an environment file (.env) with appropriate variables in the /server folder, an example .env would look like this:

  ```js
  SERVER_PORT = /* Specifiy a port here (Optional) */
  DB_NAME = /* Your database name */
  DB_USER = /* Your database user */
  DB_PASSWORD = /* Your database user's password */
  DB_HOST = /* Your database host (Optional) */
  ```

- Then run the following command to start the React Client:

  ```bash
  # In /client
  yarn start
  ```

- Then run the following command to start the Node server:

  ```bash
  # In /server
  yarn start
  ```

## Other Scripts

- To run tests on the react client, use:

  ```bash
  # In /client
  yarn test
  ```

- To build a production react client, use:

  ```bash
  # In /client
  yarn build
  ```

- To eject the configuartion and scripts from the react-scripts package, use:

  ```bash
  # In /client
  yarn eject
  ```
