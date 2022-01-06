const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtSecret } = require('../config/vars')

const { sendVerificationEmail } = require('../helpers/email')
const { validPassword } = require('../helpers/validate')

// get all users
const getUsers = async (req, res) => {
  try {
    let { page } = req.query
    if (!page) {
      page = 1
    }

    // limit number of records in a page
    const LIMIT = 100
    const totalUsers = await User.countDocuments({})

    const users = await User.find().sort({ _id: -1 }).limit(LIMIT)

    res.status(200).json({
      success: true,
      data: users,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalUsers / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ success: false, message: error.message })
  }
}

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    // check if user with given username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser)
      return res.status(400).json({
        success: false,
        message:
          "username isn't available. Please login or choose a different username",
      })

    const existingVerifiedUser = await User.findOne({
      $and: [{ email }, { email_verified: true }],
    })
    // if existing verified user exists
    if (existingVerifiedUser)
      return res.status(400).json({
        success: false,
        message:
          'User already exists with that email. Please choose a different email',
      })

    // check if password conditions
    if (!validPassword(password))
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 7 digits, one letter and one number',
      })

    // password hashing
    const hash = await bcrypt.hash(password, 12)

    // create new user with given details
    const newUser = await User.create({
      username,
      email,
      hash,
    })

    // verification email
    sendVerificationEmail(newUser._id, email)

    res.status(201).json({
      success: true,
      message:
        'New user created and verification mail is sent. Please verify your email to login',
      user: newUser,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const authUserId = req.userId
    // get the user data
    const userData = await User.findById(userId)

    // if user is requesting his own data
    if (userId === authUserId)
      res.status(200).json({
        success: true,
        message: 'Self data access successful',
        user: userData,
      })
    // user requesting someone else's data
    else
      res.status(200).json({
        success: true,
        message: 'User data access successful',
        user: { username: userData.username },
      })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id
    const authUserId = req.userId
    const { name, username } = req.body

    // if user is requesting someone else's update
    if (userId !== authUserId)
      return res.status(401).json({
        success: false,
        message: 'Unauthorizedto update others data',
      })

    // fetch the user data
    let newUserData = await User.findById(userId).select('+hash')
    // add new/updated data
    if (name) newUserData.name = name

    if (username) {
      // check if user with given username already exists
      const existingUser = await User.findOne({ username })
      if (existingUser)
        return res.status(400).json({
          success: false,
          message:
            'User already exists with that username. Please choose a different username',
        })

      // else set the new username
      newUserData.username = username
    }

    // update the user data
    const userData = await User.findByIdAndUpdate(userId, newUserData, {
      new: true,
    })

    res.status(200).json({
      success: true,
      message: 'User data updated successfully',
      user: userData,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// verify email
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token
    // Get userId
    const decodedData = jwt.verify(token, jwtSecret)
    // if the id from token does not match, send error message
    if (!decodedData?.id)
      return res.status(400).json({ success: false, message: 'Invalid Token' })

    const existingUser = await User.findById(decodedData.id)

    // if no user exists with given id
    if (!existingUser)
      return res.status(400).json({ success: false, message: 'Invalid Token' })
    else if (existingUser.email_verified)
      //! if email is already verified
      return res
        .status(400)
        .json({ success: false, message: 'Email is already verified' })

    //? update the email_verified to true
    await User.findByIdAndUpdate(decodedData.id, { email_verified: true })

    res
      .status(200)
      .json({ success: true, message: 'Email is verified successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getUsers, signup, getUser, updateUser, verifyEmail }
