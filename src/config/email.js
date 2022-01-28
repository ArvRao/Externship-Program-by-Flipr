const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('../middlewares/error')
const routes = require('../routes')

// create express instance
const app = express()

// enable cors
app.use(cors())

// secure app with HTTP headers
app.use(helmet())

// parse form data
app.use(express.json())

// sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize())

// routes
app.get('/ping', (req, res) => {
  res.status(200)
})

// * middleware
app.use('/email', routes.emailRoutes)

// * return error for any other route
app.all('*', (req, res) => {
  res.status(404).send('Wrong route. Enter a valid one')
})

// error handler
app.use(errorHandler)

module.exports = app
