const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bp = require('body-parser');
const indexRoutes = require('./routes/indexRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbURI = "mongodb+srv://aryanlilian:testingpass@cluster0.wcaui.mongodb.net/node-blog?retryWrites=true&w=majority";
mongoose.connect(dbURI).then((result) => app.listen(8000)).catch((err) => {console.log(err)});

app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
app.use((req, res) => {
    res.render('404', { title : '404', page_title : 'Page don\'t exist' });
});
