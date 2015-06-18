var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Device = require("../models/deviceModel");

var devices = {devices:
                [
                  {mac: "2a:da:21:fd:4f:1c" , ip : "111.111.111", name:"Maskine1"},
                  {mac: "2a:da:21:fd:4f:1c" , ip : "222.222.222", name:"Maskine2"}
                ]
              };


router.get("/",function(req, res, next) {
    Device.find(function(err,allDevices) {
      if (err) {console.log(err)};
      console.log(allDevices)
      res.json(allDevices);
    })
});

router.post("/add", function(req,res,next) {

	setTimeout(function() {

    var user = mongoose.Types.ObjectId();

    var deviceObject = {
      name:"NAME",
      type:"TYPE",
      macAdress:"MAC",
      ipAdress:"IP",
      owner: user,
      members:[user],
      addedDate: Date.now(),
      lastUpdated: Date.now()
    }
    var newDevice = new Device(deviceObject);
    
    newDevice.save(function(err) {
      if (err) {console.log(err)};
      console.log("INSERTED DEVICE");
      res.end("Success");
      res.status(200);
    })

	}, 300);

});

router.post("/delete",function(req,res,next) {
  var deviceId = req.body.id;
  for (var i = 0; i < devices.devices.length; i++) {
    if (devices.devices[i].ip === deviceId) {
      devices.devices.splice(i,1);
    };
  };

  res.send("Success");
})


module.exports = router;
