const express = require("express");
const postsController = require("../controllers/posts");
const auth = require("../middleware/auth");
const passport = require("passport")
const userDetails = require('../models/user');
const router = express.Router();

// localhost:5000/posts
router.get('/', postsController.getPosts);

router.get('/search', postsController.getPostsBySearch)
// localhost:5000/posts
router.post('/', postsController.createPost);
// localhost:5000/posts/id
router.patch('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost)
router.patch('/:id/likepost', postsController.likePost)

module.exports = router