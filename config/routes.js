var routes = require('../routes/index');
var users = require('../routes/users');
var devices = require("../routes/devices")

module.exports = function(app,express) {
	app.use('/', routes);
	app.use('/users', users);
	app.use("/devices", devices);
}