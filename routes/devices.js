var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Device = require("../models/deviceModel");

// devices/*
router.get("/",function(req, res, next) {

  setTimeout(function() {


  console.log("userId in device route: " +  req.user._id);

    // Device.find(function(err,allDevices) {
    //   if (err) {console.log(err)};
    //   res.json(allDevices);
    // })

  Device.getAccessibleDevices(req.user._id,function(err,data) {
    if (err) {
      res.status(500);
      res.send(err);
    };
    res.send(data);
  })

}, 400);

});

router.post("/add", function(req,res,next) {

	setTimeout(function() {

    // var clientDevice = req.body
    // var deviceObject = {
    //   name:clientDevice.name,
    //   type:clientDevice.type,
    //   macAdress:clientDevice.macAdress,
    //   ipAdress:clientDevice.ipAdress,
    //   owner: req.user._id,
    //   members:[req.user._id],
    //   addedDate: Date.now(),
    //   lastUpdated: Date.now()
    // }
    // var newDevice = new Device(deviceObject);
    
    // newDevice.save(function(err) {
    //   if (err) {console.log(err)};
    //   console.log("Inserted device: " + newDevice._id);
    //   res.json(newDevice);
    // })
    Device.verifyAndSave(req,function(err,status) {
      if (err) {
        res.status(500);
        res.send(status);
      } else {
        res.send(status);
      }
    });

    

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
});

router.put("/update",function(req,res,next) {

  setTimeout(function() {

    var rawDevice = req.body;
    var updatedDevice = {};
    var parseResults = {};

    for (var prop in rawDevice) {
      if (rawDevice.hasOwnProperty(prop) && ["ipAdress","macAdress","name","type"].indexOf(prop) > -1) {
        switch(prop) {
          case "ipAdress":
          updatedDevice[prop] = rawDevice[prop];
          parseResults[prop] = "true";
          break;
          case "macAdress":
          var macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
          if(rawDevice[prop].search(macRegex) > -1) {
            updatedDevice[prop] = rawDevice[prop];
            parseResults[prop] = "true";
          } else {
            parseResults[prop] = "false";
          }
          break;
          default:
          updatedDevice[prop] = rawDevice[prop];
          parseResults[prop] = "true";

          break;
        }
      }
    }
    console.log(updatedDevice);

    Device.update({"_id" : rawDevice.id},updatedDevice,function(err,result) {
      if (err) {res.status(500);console.log(err)};

      console.log("Updated device: " + req.body.name);
      res.status(200);
      res.send(parseResults);
    })

  },300);

})


module.exports = router;
