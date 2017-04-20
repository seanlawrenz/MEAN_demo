'use strict';

//Render Hello World
exports.render = function(req,res){

	res.render('index', {
		title: 'Hello World',
		user: JSON.stringify(req.user)
	});
};