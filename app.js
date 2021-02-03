const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const bp = require('body-parser');

const app = express();
const dbURI = "mongodb+srv://aryanlilian:testingpass@cluster0.wcaui.mongodb.net/node-blog?retryWrites=true&w=majority";
mongoose.connect(dbURI).then((result) => app.listen(8000)).catch((err) => {console.log(err)});

app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title : 'Index', page_title : 'Home Page' });
});

app.get('/blog/new', (req, res) => {
    res.render('add_post', { title: 'New post' });
});

app.get('/blog', (req, res) => {
    Blog.find().sort({ createdAt : -1 }).then((result) => {
        res.render('blog', { title : 'Blog', page_title : 'Blog Page', blogs : result });
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/blog', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blog');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.use((req, res) => {
    res.render('404', { title : '404', page_title : 'Page don\'t exist' });
});
