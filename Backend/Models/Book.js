var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	 title: String,
      description: String,
      ISBN: String,
      Author: String,
      PublicationDate: Date,
      Genre:['Science', 'fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror'],
      Price: String
});

var Book = mongoose.model('Book', BookSchema );