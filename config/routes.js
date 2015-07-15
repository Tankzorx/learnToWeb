var routes = require('../routes/index');
var users = require('../routes/users');
var devices = require("../routes/devices")

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
  	res.send(401);
  }
}

module.exports = function(app,express) {
	app.get("/loggedin", function(req,res) {
		res.send(req.isAuthenticated() ? req.user : "0");
	});

	app.use('/', routes);
	app.use('/users', users);
	app.use("/devices", devices);
}