# ODE-APP

Web Pipeline for visualizing and simulating kinetic(ODE-based) biological models.

Please read the [wiki](https://github.com/HelikarLab/ode-app/wiki) for documentation related to Usage, Kinetic Laws, Application Architecture and References.

## To start the application (production)

This application makes use of docker and docker compose, so first install them. Learn more about this [here](https://www.docker.com/get-started).

Run the following commands to start the application:

```bash
docker-compose build
docker-compose up
```

After this open up a browser and go to http://localhost:3000

To run the containers in the background, use:

```bash
docker-compose up -d
```

To stop the above containers run:

```bash
docker-compose stop
```

## Development

Follow the instructions below to get the app up and running in development:

- You need Node, Yarn and Python 3(alongside pip) to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com) and [Python](https://www.python.org/downloads/). Further you also need a server of a postgresql database running. Learn more about postgresql [here](https://www.postgresql.org/).

- First you will need to install the dependencies of the project. Do that by running the following in the cloned folder:

  ```bash
  # Node and React dependencies
  yarn 
  # Python dependencies
  pip install python-libsbml
  python -m pip install server/python/lib/stimator-0.9.120-py3-none-any.whl
  ```

- Next you have to setup an environment file (.env) with appropriate variables in the /server folder, an example .env would look like this:

  ```bash
  PORT=#Specifiy a port here (Optional)
  POSTGRES_HOST=#Your database host (Optional)
  POSTGRES_DB=#Your database name
  POSTGRES_USER=#Your database user
  POSTGRES_PASSWORD=#Your database user's password
  ```

- Then run the following command to start both the React Client and Node Server(concurrently):

  ```bash
  yarn dev
  ```

## Testing

This project uses [cypress](https://www.cypress.io/) for testing.

- To run tests for the project, use:

  ```bash
  yarn test
  ```

- To open cypress only, use:

  ```bash
  yarn cypress
  ```

## Other Scripts

- To run the node server individually, use:

  ```bash
  yarn server:start
  ```

  ---OR---

  ```bash
  # In /server
  yarn start
  ```

- To build the server for production, use:

  ```bash
  yarn server:build
  ```

  ---OR---

  ```bash
  # In /server
  yarn build
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
  yarn client:start
  ```

  ---OR---

  ```bash
  # In /client
  yarn start
  ```

- To build a production react client, use:

  ```bash
  yarn client:build
  ```

  ---OR---

  ```bash
  # In /client
  yarn build
  ```

- To eject the configuartion and scripts from the react-scripts package, use:

  ```bash
  # In /client
  yarn eject
  ```
