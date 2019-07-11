# ODE-APP

Web Pipeline For Kinetic (ODE-Based) Models.

## To start the application (production)

This application makes use of docker and docker compose, so first install them. Learn more about this [here](https://www.docker.com/get-started).

Run the following commands to start the application:

```bash
docker-compose build
docker-compose up
```

After this open up a browser and go to http://localhost:3000

## Repository Structure

```
 |- client              -> Contains the code of the react client
    |- src              -> Source files of the react client
        |- components   -> React components
        |- store        -> global store
 |- server              -> Contains the code of the node server
    |- routes           -> API routes
    |- controllers      -> API controllers
    |- models           -> Sequelize(SQL) models
    |- config           -> Configuration files
    |- python           -> Python scripts to parse SBML files and simulate ODE models
    |- scripts          -> Utility scripts
 |- docker-compose.yml  -> Docker Compose files that runs the application using docker
 |- package.json        -> The main package.json governing the yarn workspaces
 |- README.md           -> The main documentation file. Also this file :)
```

## Development

Follow the instructions below to get the app up and running in development:

- You need Node, Yarn and Python 3(alongside pip) to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com) and [Python](https://www.python.org/downloads/). Further you also need a server of a postgresql database running. Learn more about postgresql [here](https://www.postgresql.org/).

- First you will need to install the dependencies of the project. Do that by running this:

  ```bash
  # inside the repo
  yarn # Node and React dependencies
  # Python dependencies
  pip install python-libsbml
  python -m pip install server/python/lib/stimator-0.9.120-py3-none-any.whl
  ```

- Next you have to setup an environment file (.env) with appropriate variables in the /server folder, an example .env would look like this:

  ```js
  SERVER_PORT = /* Specifiy a port here (Optional) */
  DB_HOST = /* Your database host (Optional) */
  DB_NAME = /* Your database name */
  DB_USER = /* Your database user */
  DB_PASSWORD = /* Your database user's password */
  ```

- Then run the following command to start both the React Client and Node Server(concurrently):

  ```bash
  yarn dev
  ```

## Other Scripts

- To run the node server individually, use:

  ```bash
  yarn server
  ```

  ---OR---

  ```bash
  # In /server
  yarn start
  ```

- To sync tables in the database, use:

  ```bash
  # In /server
  yarn sync-tables
  ```

  With force option (will delete existing tables with the same names):

  ```bash
  # In /server
  yarn sync-tables -f
  ```

- To run the react client individually, use:

  ```bash
  yarn client
  ```

  ---OR---

  ```bash
  # In /client
  yarn start
  ```

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
