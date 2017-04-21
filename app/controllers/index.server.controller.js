'use strict';

//Render Hello World
exports.render = function(req,res){

	res.render('index', {
		title: 'Articles',
		user: JSON.stringify(req.user)
	});
};