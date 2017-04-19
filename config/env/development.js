'use strict';

module.exports = {
	//Mongoose
	db: 'mongodb://localhost/mean-book',
	//Cookie stored session
	sessionSecret: 'developmentSessionSecret',
	twitter:{
		clientID: 'xWLCI3rRBXcMflUaJ0WtiFNfQ',
		clientSecret: '76kmTe8YC4PMczO0JyBbwZL0FHagaYepGo9IMmH34FtMJ3EyQF',
		callbackURL:'http://localhost:3000/oauth/twitter/callback'
	}
};