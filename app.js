const express = require('express')

app = express();
app.listen(8000);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root : __dirname});
});

app.get('/blog', (req, res) => {
    res.sendFile('./views/blog.html', {root : __dirname});
});

app.get('/blog-me', (req, res) => {
    res.redirect('/blog');
});

app.use((req, res) => {
    res.sendFile('./views/404.html', {root : __dirname});
});
