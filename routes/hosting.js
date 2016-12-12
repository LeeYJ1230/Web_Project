//호스팅 안내
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hosts/hosting');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

module.exports = router;
