var expressSession = require('express-session');
var User = require("../models/userModel");
var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");

module.exports = function(app,passport) {
	app.use(expressSession({secret: 'mySecretKey',
	                        name: 'learnToWebCookie',
	                        resave: 'false',
	                        saveUninitialized: 'false'}));
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user,done) {
		done(null,user._id);
	});

	passport.deserializeUser(function(id,done) {
		User.findById(id,function(err,user) {
			done(err, user);
		})
	});

	passport.use("login", new LocalStrategy({
		passReqToCallback : true
	},
	function(req,username,password,done) {
		User.findone({ 'username' : username },
			function(err,user) {
				if (err) {return done(err)};
				if (!user) {
					console.log("User Not Found: " + username);
					return done(null,false);
				}
				if (!isValidPassword(user,password)){ // CHECK PASSWORD HERE.
					console.log("Invalid Password");
					return done(null,false);
				}

				return done(null,user);

			}
		)
	}

	));
}

var isValidPassword = function(user,password) {
	return bCrypt.compareSync(password,user.password);
};