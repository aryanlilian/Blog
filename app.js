const express = require('express');
const morgan = require('morgan');

app = express();
app.listen(8000);
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.static('static'))

app.get('/', (req, res) => {
    res.render('index', {title : 'Index', page_title : 'Home Page'});
});

app.get('/blog', (req, res) => {
    const blogs = [
        {title : 'First post', content : 'The content here'},
        {title : 'Second post', content : 'The content here'},
        {title : 'Third post', content : 'The content here'},
    ];
    res.render('blog', {title : 'Blog', page_title : 'Blog Page', blogs});
});

app.use((req, res) => {
    res.render('404', {title : '404', page_title : 'Page don\'t exist'});
});
