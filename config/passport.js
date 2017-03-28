'use strict';

//Module dependencies
var passport = require('passport'),
	mongoose = require('mongoose');

//Passport Configuration
module.exports = function(){
	var User = mongoose.model('User');
	passport.serializeUser(function(user, done){
		done(null,user.id);
	});

	//Load the User document
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	require('./strategies/local.js')();
	require('./strategies/twitter.js')();
};