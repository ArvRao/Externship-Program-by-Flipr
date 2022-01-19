const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '../../.env')
})

//import all global variables into the file
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mediaPort: process.env.MEDIA_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_INTERVAL,
  jwtVerifyEmailExpirationInterval: process.env.JWT_VERIFY_EMAIL_EXPIRATION_INTERVAL,
  mongo: {
    uri: process.env.MONGO_URI,
  },

  emailConfig: {
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  },
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
}