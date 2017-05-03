'use strict';

//Requirement modules
   var  config = require('./config'),
   		  http = require('http'),
   	   express = require('express'),
   	  socketio = require('socket.io'),
	 	morgan = require('morgan'),
   	  compress = require('compression'),
 	bodyParser = require('body-parser'),
 	   session = require('express-session'),
 	MongoStore = require('connect-mongo')(session),
methodOverride = require('method-override'),
		 flash = require('connect-flash'),
	  passport = require('passport');

//Grabbing the controller index nameing it app so express is now app
module.exports = function(db){
	var app = express();
	var server = http.createServer(app);
	var io = socketio.listen(server);
	
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

	var mongoStore = new MongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        });

	//Formats data to be in JSON
	app.use(bodyParser.json());
	//For PUT and DELETE requests
	app.use(methodOverride());

	//Bridge between Express and connect-mongo
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	//Session handler
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//VIEWS
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Load the 'index' routing file
	require('../app/routes/index.server.routes.js')(app);
	//Load the 'users' routing file
	require('../app/routes/users.server.routes.js')(app);
	//Load the 'articles' routing file
	require('../app/routes/articles.server.routes.js')(app);

	//Load static files
	app.use(express.static('./public'));

	//Socket Session return
	require('./socketio')(server,io,mongoStore);

	return server;
};