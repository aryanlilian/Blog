const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    console.log(req.url + ' ' + req.method);

    let path = './';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/blog':
            path += 'blog.html';
            res.statusCode = 200;
            break;
        case '/blog-me':
            res.statusCode = 301;
            res.setHeader('Location', '/blog');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if(err) throw err;
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`The server is running on localhost:${port}`);
});
