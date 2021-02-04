const index = (req, res) => {
    res.render('index', { title : 'Index', page_title : 'Home Page' });
}

module.exports = {
    index
}
