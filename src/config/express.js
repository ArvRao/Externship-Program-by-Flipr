const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const routes = require('../routes')
const errorHandler = require('../middlewares/error')

const app = express()
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

// enable cors
app.use(cors())

app.options('*', cors())

// routes
app.get('/ping', (req, res) => {
  res.status(200).send('It"s working successfully')
})

app.use('/users', routes.userRoutes)
app.use('/login', routes.loginRoutes)

app.all('*', (req, res) => {
  res.status(404).send('Wrong route. Enter a valid one')
})

// app.use(errorHandler)

module.exports = app
