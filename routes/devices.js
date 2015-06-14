var express = require('express');
var router = express.Router();

var devices = {devices:
                [
                  {id: 1 , ip : "111.111.111", name:"Maskine1"},
                  {id: 2 , ip : "222.222.222", name:"Maskine2"}
                ]
              };


router.get("/",function(req, res, next) {
  res.json(devices);
  res.end();
});

router.post("/insert", function(req,res,next) {

	var newDevice = req.body;
	res.json({devices:
  						[
  							{id: 1 , ip : "111.111.111", name:"Maskine1"},
  							{id: 2 , ip : "222.222.222", name:"Maskine2"},
  							newDevice
  						]
  					});

});


module.exports = router;
