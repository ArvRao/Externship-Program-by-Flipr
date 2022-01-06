const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const vars = require('../config/vars')
const { sendVerificationEmail } = require('../helpers/email')

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // ? check if user with the given username exists
    const existingUser = await User.findOne({ username }).select('+hash')

    //* if user not present in DB
    if (!existingUser)
      return res.status(404).json({
        success: false,
        message: 'Given user does not exist. Try a different username',
      })

    // * check if email is verified
    if (!existingUser.email_verified) {
      // check if there is a verified user
      const verifiedUser = await User.findOne({
        $and: [{ email: existingUser.email }, { email_verified: true }],
      })

      //! If verified user exists, send an error
      if (verifiedUser)
        return res.status(401).json({
          success: false,
          message:
            'User with the given email already exists. Please use a different email.',
        })
      else {
        // send verification email
        sendVerificationEmail(existingUser._id, existingUser.email)

        return res.status(200).json({
          success: false,
          message:
            'Verification email is sent. Please verify the email to login.',
        })
      }
    }

    // compare the two passwords
    const PasswordCompare = await bcrypt.compare(password, existingUser.hash)

    // check if password is correct
    if (!PasswordCompare)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' })

    // token generation
    const token = jwt.sign({ id: existingUser._id }, vars.jwtSecret, {
      expiresIn: vars.jwtExpirationInterval,
    })

    res.status(200).json({ success: true, user: existingUser, token })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { login }
