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

deviceSchema.statics.getAccessibleDevices = function (userid,cb) {
	console.log("Getting accessible devices for: " + userid);
	this.find({ members : userid},function(err,data) {
		if (err) {cb(err)};
		cb(null,data);
	})
}

deviceSchema.statics.verifyAndSave = function (req,cb) {
	console.log("Verifying and saving device for: " + req.user._id);
	var clientDevice = req.body
	var statusObj = {
		name 		: false,
		ipAdress 	: false,
		macAdress	: false,
		type		: false,
	}
	var verifiedDevice = {
		owner		: req.user._id,
		members		:[req.user._id],
		addedDate	: Date.now(),
		lastUpdated	: Date.now(),
	}

	var macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
	var ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
	var checkSum = 0;
	if (clientDevice.macAdress 
	&& clientDevice.macAdress.search(macRegex) > -1) {
		console.log("OK: MACADRESS")
		statusObj.macAdress = true;
		checkSum += 1;
		verifiedDevice.macAdress = clientDevice.macAdress;
	};
	if (clientDevice.name
	&& clientDevice.name.length > 0) {
		console.log("OK: NAME")
		statusObj.name = true;
		checkSum += 1;
		verifiedDevice.name = clientDevice.name;
	};
	if (clientDevice.ipAdress
	&& clientDevice.ipAdress.search(ipRegex) > -1) {
		console.log("OK: IPADRESS")
		statusObj.ipAdress = true;
		checkSum += 1;
		verifiedDevice.ipAdress = clientDevice.ipAdress;	
	};
	if (clientDevice.type
	&& clientDevice.type.length > 0) {
		console.log("OK: TYPE")
		statusObj.type = true;
		checkSum += 1;
		verifiedDevice.type = clientDevice.type;
	};

	if (checkSum == 4) {
		var newDevice = new Device(verifiedDevice);

		newDevice.save(function(err) {
			if (err) {
				cb(err,statusObj);
			}
			cb(null,statusObj);

		});
	} else {
		cb(new Error("Invalid Input"),statusObj)
	}


}

var Device = mongoose.model("Device",deviceSchema)

module.exports = Device;