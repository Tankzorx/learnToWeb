var routes = require('../routes/index');
var users = require('../routes/users');
var devices = require("../routes/devices")

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
  	res.sendStatus(401);
  }
}

module.exports = function(app,express,passport) {
	app.get("/loggedin", function(req,res) {
		if (req.isAuthenticated()) {
			res.send(req.user)
		} else {
			res.status(401);
			res.send("Not Authenticated.")
		}
	});

	app.use('/', routes);
	app.use('/users', users(passport));
	app.use("/devices",isAuthenticated, devices);
}