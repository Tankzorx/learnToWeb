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
	console.log("Added device")
	res.status(200);
	res.send("Success")

	}, 3000);

});

router.post("/remove")


module.exports = router;
