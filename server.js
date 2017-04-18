'use strict';

//Declaring Development enviorment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load Modules
var mongoose = require('./config/mongoose'),
	 express = require('./config/express'),
	passport = require('./config/passport');

//New instance of Mongoose
var db = mongoose();
//New instance of Express
var app = express();
//New instance of Passport
var passport = passport();

//Server port 300
app.listen(3000);

//Express application instance for external usage
module.exports = app;

console.log('Server running at http://localhost:3000/');