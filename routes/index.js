var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/Login', function(req, res, next) {
  res.render('Login');
});

module.exports = router;
