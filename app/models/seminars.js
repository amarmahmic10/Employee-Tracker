//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SeminarsModelSchema = new Schema({
    name: String,
    topic: String,
    by: String,
    date: String,
    place: String,
    time: String

});

//Export function to create "Seminar" model class
module.exports = mongoose.model('Seminars', SeminarsModelSchema );