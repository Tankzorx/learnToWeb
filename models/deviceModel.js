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
	
	var verificationResult = verifyDevice(req.body);
	if (verificationResult.verified) {

		verificationResult.device.owner			= req.user._id;
		verificationResult.device.members		= [req.user._id];
		verificationResult.device.addedDate		= Date.now();
		verificationResult.device.lastUpdated	= Date.now();

		var newDevice = new Device(verificationResult.device);

		newDevice.save(function(err) {
			if (err) {
				cb(err,verificationResult.statusObj);
			}
			cb(null,verificationResult.statusObj);
			});
	} else {
		cb(new Error("Invalid Input"),verificationResult.statusObj)
	}


}

deviceSchema.statics.verifyAndUpdate = function(req,cb) {

}

var Device = mongoose.model("Device",deviceSchema)

module.exports = Device;

var verifyDevice = function(device) {
	var statusObj = {
		name 		: false,
		ipAdress 	: false,
		macAdress	: false,
		type		: false,
	}

	var verifiedDevice = {};

	var macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
	var ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
	var checkSum = 0;
	if (device.macAdress 
	&& device.macAdress.search(macRegex) > -1) {
		console.log("OK: MACADRESS")
		statusObj.macAdress = true;
		checkSum += 1;
		verifiedDevice.macAdress = device.macAdress;
	};
	if (device.name
	&& device.name.length > 0) {
		console.log("OK: NAME")
		statusObj.name = true;
		checkSum += 1;
		verifiedDevice.name = device.name;
	};
	if (device.ipAdress
	&& device.ipAdress.search(ipRegex) > -1) {
		console.log("OK: IPADRESS")
		statusObj.ipAdress = true;
		checkSum += 1;
		verifiedDevice.ipAdress = device.ipAdress;	
	};
	if (device.type
	&& device.type.length > 0) {
		console.log("OK: TYPE")
		statusObj.type = true;
		checkSum += 1;
		verifiedDevice.type = device.type;
	};

	var retVal = {};
	retVal.verified = checkSum == 4;
	retVal.statusObj = statusObj;
	retVal.device = verifiedDevice;

	return retVal;
};