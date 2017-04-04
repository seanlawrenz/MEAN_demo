'use strict';

var User = require('mongoose').model('User');

// Create new user
exports.create = function(req, res, next) {
	var user = new User(req.body);
	//functions
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

//Find user
exports.list = function(req, res, next){
	User.find({}, function(err,users){
		if (err){
			return next(err);
		} else{
			res.json(users);
		}
	});
};

//JSON read
exports.read = function(req, res){
	res.json(req.user);
};

//Finding one user
exports.userByID = function(req, res, next, id){
	User.findOne({
		_id: id
	}, function(err, user){
		if (err){
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

//Updating
exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if (err){
			return next(err);
		} else {
			res.json(user);
		}
	});
};

//Deleting
exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	})
};











