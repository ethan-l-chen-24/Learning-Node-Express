const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// check for DB errors
db.on('error', (err) => {
    console.log(err);
});

// init app
const app = express();

// Bring in the Models
let Article = require('./models/article');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
 
// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// home route
app.get('/', (req, res) => {

    // get the articles from the model database and render onto page
    Article.find({}, (err, articles) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });

    /*let articles = [
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
    }); */

    console.log('Someone logged on');
})

// add route
app.get('/articles/add', (req, res) => {
    res.render('addArticle', {
        title: 'Add Article'
    })
})

// get single article
app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        })
    })
})

// add submit POST route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })

    console.log(`added ${article.title}`);
    return;
})

// add submit POST route for edit
app.post('/articles/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Article.updateOne(query, article, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    });

});

// add edit route 
app.get('/articles/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('editArticle', {
            article: article
        })
    })
})

// start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
})