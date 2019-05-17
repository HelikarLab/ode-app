// Dependencies
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

// Sanitize Data
app.use(helmet())

// Custom Request Logging
app.use(morgan('tiny'))

// JSON Payload Parser
app.use(express.json())

// Error Handling
app.use((err, req, res, next) => {
  console.log(err.stack)
  res
    .status(500)
    .json({ message: 'Uncaught Internal Server Error, Something Broke.' })
})

// Starting the server
const port = process.env.SERVER_PORT || 5000
app.listen(port, () => console.log('Server Running On Port: ', port))

module.exports = app
