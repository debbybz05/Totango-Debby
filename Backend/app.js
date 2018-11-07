const express = require('express')
const bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/bookStore';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
require('./Models/Book');
var Book= mongoose.model('Book');
const port = 4000
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
	Book.find({}, function(err, books) {
        if(err)
            next(err);
	    else res.send(books);
    })
})

app.delete('/', (req, res, next) => {
    Book.deleteOne(req.query, function(err) {
        if(err)
            next(err);
        else Book.find({}, function(err, books) {
            if(err)
                next(err);
            else res.send(books);
        })
    })
})

app.post('/', (req, res, next) => {
    var book = new Book(req.body);
    book.save(function (err) {
        if(err)
            next(err);
        else Book.find({}, function(err, books) {
           if(err)
                next(err);
            else res.send(books);
        })
    });
})      

app.listen(port, () => console.log(`Example app listening on port ${port}!`))