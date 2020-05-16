const express = require('express')
const {getPosts, createPost, postByUser, postById,isPoster, deletePost, updatePost } = require('../controllers/post')
const { userById } = require('../controllers/user')
const {createPostValidator} = require('../helpers/validator')
const { requireJwt } = require('../controllers/auth')

const router =  express.Router()

router.get("/posts", requireJwt, getPosts);

router.post(
    "/post/new/:userId", 
    requireJwt, 
    createPost, 
    createPostValidator 
);

router.get("/posts/by/:userId", requireJwt, postByUser);

router.put("/post/:postId", requireJwt, isPoster, updatePost);

router.delete("/post/:postId", requireJwt, isPoster, deletePost);
    

router.param("userId", userById)

router.param("postId", postById)

module.exports = router