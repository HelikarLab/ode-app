// Dependencies
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import db from './config/database'

// Adds support for .env environment files
require('dotenv').config()

// Declaring the express app
const app = express()

// CORS
app.use(cors())

// API Route Imports
import uploadSbmlApi from './routes/uploadSbml'
import modelApi from './routes/model'
import simulationApi from './routes/simulation'

// Sanitize Data
app.use(helmet())

// Custom Request Logging
app.use(morgan('tiny'))

// JSON Payload Parsers
app.use(express.json({ limit: '5mb' }))

// Establishing and testing database connection
const connectDb = async (retries = 5) => {
  while (retries) {
    await db
      .authenticate()
      .then(() => {
        console.log('Database connected...')
        retries = 0
      })
      .catch(async err => {
        console.log(err)
        retries -= 1
        console.log(`Retries left: ${retries}`)
        // wait 5 seconds
        await new Promise(res => setTimeout(res, 5000))
      })
  }
}
connectDb()

// APIs
app.use('/api/uploadSbml', uploadSbmlApi)
app.use('/api/model', modelApi)
app.use('/api/simulation', simulationApi)

// Error Handling
app.use((err, req, res, next) => {
  console.log(err.stack)
  res
    .status(500)
    .json({ message: 'Uncaught Internal Server Error, Something Broke.' })
})

// Serving the react client
app.use(express.static('public'))

// Starting the server
const port = process.env.PORT || 5000
const server = app.listen(port, () =>
  console.log('Server Running On Port: ', port)
)
// Setting the server global timeout to 10 minutes (600000 msec)
server.setTimeout(600000)
