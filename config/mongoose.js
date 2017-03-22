'use strict';

var	config = require('./config'),
  mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	//Schema models
  	require('../app/models/user.server.model');
  	return db;
  };
