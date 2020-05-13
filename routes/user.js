const express = require('express')
const {signup, signin, signout} = require('../controllers/auth')
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const {userSignupValidator} = require('../helpers/validator')
const { requireJwt } = require('../controllers/auth')

const router =  express.Router()

router.get("/users", allUsers)
router.get("/users/:userId", requireJwt, getUser)
router.put("/users/:userId", requireJwt, updateUser)
router.delete("/users/:userId", requireJwt, deleteUser)


router.param("userId", userById)

module.exports = router