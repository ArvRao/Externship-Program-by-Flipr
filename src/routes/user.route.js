const router = require('express').Router()
const {
  signup,
  getUser,
  getUsers,
  verifyEmail,
  updateUser,
} = require('../controllers/user.controller')

const { auth } = require('../middlewares/auth')

// * Sign up route
router.post('/signup', signup)

// * Get all the users
router.get('/', getUsers)

// * Get info about particular user
router.get('/:id', auth, getUser)

// * Email verification
router.get('/email_verify/:token', verifyEmail)

// * User updation
router.put('/:id', auth, updateUser)

module.exports = router
