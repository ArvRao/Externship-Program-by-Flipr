const router = require('express').Router()
const { login } = require('../controllers/login.controller')

// * For login route
router.post('/', login)

module.exports = router
