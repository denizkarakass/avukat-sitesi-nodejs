
const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.route('/').post(blogController.createBlog);
router.route('/').get(blogController.getAllBlogs);
router.route('/:slug').get(blogController.getBlog);
router.route('/:slug').delete(blogController.deleteBlog);



module.exports = router;