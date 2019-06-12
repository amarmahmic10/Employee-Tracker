//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TasksModelSchema = new Schema({
    task:String,
    deadline:String,
    department:String,
    description:String

});

//Export function to create "Seminar" model class
module.exports = mongoose.model('Tasks', TasksModelSchema );