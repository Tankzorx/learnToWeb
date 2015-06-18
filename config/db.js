var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/learnToWeb");

exports.mongoose;
exports = mongoose.connection;