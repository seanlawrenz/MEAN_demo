'use strict';

//Setting dependents
var config = require('./config'),
  mongoose = require('mongoose');

//Mongoose module
module.exports = function(){
	var db = mongoose.connect(config.db);

	//Schemas
	//User Schema
	require('../app/models/user.server.model');

	return db;
};