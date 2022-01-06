const mongoose = require('mongoose')
const { mongo } = require('./vars')

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

// connect with mongodb if no error
module.exports.connect = () => {
  mongoose
    .connect(mongo.uri)
    .then(() => console.log('Connected with mongoDB database'))
  return mongoose.connection
}
