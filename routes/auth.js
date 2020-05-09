const express = require('express')
const {signup, signin, signout} = require('../controllers/auth')
const {userSignupValidator} = require('../helpers/validator')

const router =  express.Router()


router.post("/signup", userSignupValidator,signup)
router.post("/signin", signin)
router.post("/signout", signout)

module.exports = router