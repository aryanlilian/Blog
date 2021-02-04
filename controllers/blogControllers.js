const Blog = require('../models/blog');


const blog_posts = (req, res) => {
    Blog.find().sort({ createdAt : -1 }).then((result) => {
        res.render('blog', { title : 'Blog', page_title : 'Blog Page', blogs : result });
    }).catch((err) => {
        console.log(err);
    });
}

const blog_new_get = (req, res) => {
    res.render('add_post', { title: 'New post' });
}

const blog_new_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blog');
    }).catch((err) => {
        console.log(err);
    });
}

const post = (req, res) => {
    Blog.findById(req.params.id)
    .then(result => {
        res.render('post', { blog: result, title: 'Blog details', page_title: 'Hello there' });
    })
    .catch(err => {
        res.status(404).render('404', { title : '404', page_title : 'Page don\'t exist' });
    });
}

const post_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(result => {
        res.json({ redirect: '/blog' });
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    blog_posts,
    blog_new_get,
    blog_new_post,
    post,
    post_delete,
}
