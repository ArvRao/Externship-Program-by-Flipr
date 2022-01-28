const nodemailer = require('nodemailer')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const vars = require('../config/vars')

// ? has sender information
const TransporterObj = () =>
  nodemailer.createTransport({
    host: vars.emailConfig.host,

    // * use hotmail for outlook
    auth: {
      user: vars.emailConfig.username,
      pass: vars.emailConfig.password,
      type: 'oauth2',
    },
  })

const toSendVerificationEmail = async (to, verificationToken) => {
  await axios.post(`http://localhost:${vars.emailConfig.port}/email/verify`, {
    to,
    verificationToken,
  })
}

const sendVerificationEmail = async (userId, email) => {
  // generate auth token
  const verificationToken = jwt.sign({
    id: userId
  }, vars.jwtSecret, {
    expiresIn: vars.jwtVerifyEmailExpirationInterval,
  })

  // Send verification email
  toSendVerificationEmail(email, verificationToken)
}

const sendResetPasswordEmail = async (userId, email) => {
  // generate auth token
  const verificationToken = jwt.sign({
    id: userId
  }, vars.jwtSecret, {
    expiresIn: vars.jwtResetPassExpirationInterval,
  });

  // Send email
  await axios.post(
    `http://localhost:${vars.emailConfig.port}/_password`, {
      to: email,
      verificationToken,
    }
  );
};

module.exports = {
  TransporterObj,
  sendVerificationEmail,
  sendResetPasswordEmail
}