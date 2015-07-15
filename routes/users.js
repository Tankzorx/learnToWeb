var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login",passport.authenticate("local"),function(req,res) {
	res.send(req.user);
});

module.exports = router;
