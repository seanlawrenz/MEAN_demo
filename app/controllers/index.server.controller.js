'use strict';

//Render Hello World
exports.render = function(req,res){

	//Session conditional
	if(req.session.lastVisit){
		console.log(req.session.lastVisit);
	}

	//Initalizing last visit time
	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'Hello World'
	})
};