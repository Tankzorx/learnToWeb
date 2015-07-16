var express = require("express");
var router = express.Router();
var User = require("../models/userModel");

/* GET users listing. */
module.exports = function(passport) {

	router.get("/", function(req, res, next) {
	  res.send("respond with a resource");
	});

	router.post("/login",passport.authenticate("login"),function(req,res) {
		res.send(req.user);
	});

	router.post("/signup",function(req,res) {
		var reqUser = req.body;
		var userObject =  {
			email : reqUser.email,
			password : reqUser.passwordHash,
			username : reqUser.username,
			type : 1
		}

		var newUser = new User(userObject);

		newUser.save(function(err) {
			if (err) {console.log(err)};
			console.log("Added user: " + userObject.email);
			res.sendStatus(200);
		})
	});

	return router;

}




