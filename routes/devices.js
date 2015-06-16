var express = require('express');
var router = express.Router();

var devices = {devices:
                [
                  {mac: "2a:da:21:fd:4f:1c" , ip : "111.111.111", name:"Maskine1"},
                  {mac: "2a:da:21:fd:4f:1c" , ip : "222.222.222", name:"Maskine2"}
                ]
              };


router.get("/",function(req, res, next) {
    res.json(devices);    
});

router.post("/add", function(req,res,next) {
	setTimeout(function() {

	var newDevice = req.body;
  devices.devices.push(newDevice);
	res.status(200);
	res.end("Success");

	}, 3000);

});

router.post("/delete",function(req,res,next) {
  console.log("==========================================")
  var deviceId = req.body.id;
  console.log(deviceId);
  console.log(devices.devices.length);
  for (var i = 0; i < devices.devices.length; i++) {
    console.log(devices.devices[i].ip)
    if (devices.devices[i].ip === deviceId) {
      console.log(devices.devices.length);
      devices.devices.splice(i,1);
      console.log(devices.devices.length);
    };
  };

  res.send("Success");
  console.log("==========================================")
  
})


module.exports = router;
