var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Device = require("../models/deviceModel");

// devices/*
router.get("/",function(req, res, next) {

  setTimeout(function() {

  console.log("userId in device route: " +  req.user._id);

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

    Device.verifyAndUpdate(req,function(err,status) {
      if (err) {
        res.status(500);
        res.send(status);
      } else {
        res.send(status);
      }
    }); 

  },300);

})


module.exports = router;
