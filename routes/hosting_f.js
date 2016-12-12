//호스팅 완료
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hosts/hosting_f');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

module.exports = router;