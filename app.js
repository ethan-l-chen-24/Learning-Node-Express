const express = require('express');
const path = require('path');

// init app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// home route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article 1',
            author: 'Ethan Chen',
            body: 'This is article 1'
        },
        {
            id: 2,
            title: 'Article 2',
            author: 'Ethan Chen',
            body: 'This is article 2'
        },
        {
            id: 3,
            title: 'Article 3',
            author: 'Ethan Chen',
            body: 'This is article 3'
        },
        {
            id: 4,
            title: 'Article 4',
            author: 'Ethan Chen',
            body: 'This is article 4'
        },
    ]

    res.render('index', {
        title: 'Index',
        articles: articles
    });
    console.log('Someone logged on');
})

// add route
app.get('/articles/add', (req, res) => {
    res.render('addArticle', {
        title: 'Add Article'
    })
})

// start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
})