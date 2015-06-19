var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/ping",function(req,res) {
	res.send("pong",200);
})

module.exports = router;
