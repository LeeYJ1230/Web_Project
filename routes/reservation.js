var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('reserve/reservation');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

module.exports = router;
