var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	name: String,
	type: String,
	macAdress: String,
	ipAdress: String,
	owner: Schema.Types.ObjectId,
	members:[Schema.Types.ObjectId],
	addedDate: Date,
	lastUpdated: Date
});

module.exports = mongoose.model("Device",deviceSchema);