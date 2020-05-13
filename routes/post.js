const express = require('express')
const {getPosts, createPost} = require('../controllers/post')
const { userById } = require('../controllers/user')
const validator = require('../helpers/validator')
const { requireJwt } = require('../controllers/auth')



const router =  express.Router()

router.get("/posts", requireJwt, getPosts)
router.post("/post", requireJwt, validator.createPostValidator, createPost)

router.param("userId", userById)

module.exports = router