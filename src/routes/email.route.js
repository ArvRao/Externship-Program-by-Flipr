const router = require('express').Router()
const { verifyEmail } = require('../controllers/email.controller')

// * Verify the email
router.post('/verify', verifyEmail)

module.exports = router
