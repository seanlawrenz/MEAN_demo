'use strict';

//Declaring Development enviorment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load Express
var express = require('./config/express');

//New instance of Express
var app = express();

//Server port 300
app.listen(3000);

//Express application instance for external usage
module.exports = app;

console.log('Server running at http://localhost:3000/');