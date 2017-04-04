'use strict';

//Requirement modules
   var  config = require('./config'),
   	   express = require('express'),
	 	morgan = require('morgan'),
   	  compress = require('compression'),
 	bodyParser = require('body-parser'),
 	   session = require('express-session'),
methodOverride = require('method-override');

//Grabbing the controller index nameing it app so express is now app
module.exports = function(){
	var app = express();
	
	//Development status. Prod or development
	if(process.env.NODE_ENV === 'development'){
		//Console logger
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		//Compression of HTTP requests
		app.use(compress());
	}

	//Request data middlewear
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//Formats data to be in JSON
	app.use(bodyParser.json());
	//For PUT and DELETE requests
	app.use(methodOverride());

	//Session handler
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	//VIEWS
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Load the 'index' routing file
	require('../app/routes/index.server.routes.js')(app);

	//Load static files
	app.use(express.static('./public'));

	return app;
};