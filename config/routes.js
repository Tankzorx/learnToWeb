var routes = require('../routes/index');
var users = require('../routes/users');
var devices = require("../routes/devices")

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.status(403);
  res.json({forbidden: "yep"});
}

module.exports = function(app,express) {
	app.use('/', routes);
	app.use('/users', users);
	app.use("/devices", devices);
}