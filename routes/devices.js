var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Device = require("../models/deviceModel");

// devices/*
router.get("/",function(req, res, next) {

    setTimeout(function() {

    Device.find(function(err,allDevices) {
      if (err) {console.log(err)};
      res.json(allDevices);
    })
      
    }, 400);


});

router.post("/add", function(req,res,next) {

	setTimeout(function() {

    var user = mongoose.Types.ObjectId();
    var clientDevice = req.body
    var deviceObject = {
      name:clientDevice.name,
      type:clientDevice.type,
      macAdress:clientDevice.macAdress,
      ipAdress:clientDevice.ipAdress,
      owner: user,
      members:[user],
      addedDate: Date.now(),
      lastUpdated: Date.now()
    }
    var newDevice = new Device(deviceObject);
    
    newDevice.save(function(err) {
      if (err) {console.log(err)};
      console.log("Inserted device: " + newDevice._id);
      res.json(newDevice);
    })

	}, 300);

});

router.post("/delete",function(req,res,next) {
  var deviceId = req.body.id;
  Device.remove({_id : deviceId},function(err) {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.send("Deleted device");
    }

  })
})


module.exports = router;
