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

	router.post("/signup",passport.authenticate("signup"),function(req,res) {
		res.send(res.user);
	});

	router.get("/logout",function(req,res) {
		req.logout();
		res.sendStatus(200)
	})

	return router;

}




