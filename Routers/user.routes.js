const { signUp, verifyOtp } = require('../Controllers/user.controller')

const router = require('express').Router()

// Getting the number and sending the OTP
router.post('/sign', signUp)

// Verifying the OTP
router.post('/sign/verify', verifyOtp)

module.exports = router