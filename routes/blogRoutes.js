const express = require('express')
const router = express.Router();
const blogControllers = require('../controllers/blogControllers')

router.get('/', blogControllers.blog_posts);
router.get('/new', blogControllers.blog_new_get);
router.post('/', blogControllers.blog_new_post);
router.get('/post/:id', blogControllers.post);
router.delete('/post/:id', blogControllers.post_delete);

module.exports = router;
