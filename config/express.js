'use strict';

//Module dependencies
	var config = require('./config'),
	   express = require('express'),
	 	morgan = require('morgan'),
      compress = require('compression'),
    bodyParser = require('body-parser'),
methodOverride = require('method-override'),
	   session = require('express-session'),
	     flash = require('connect-flash'),
	  passport = require('passport');

//Express Configuration
module.exports = function(){
	var app = express();
	//Development Mode
	if (process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else if (process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	//Middleware 
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	//Views
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	//Routes
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);

	//Static
	app.use(express.static('./public'));

	return app;
};