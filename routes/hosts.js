var express = require('express'),
    Host = require('../models/Host');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/Login');
  }
}

//게시판의 홈화면을 보여준다.
router.get('/', needAuth, function (req, res, next) {
  Host.find({}, function (err, hosts) {
    if (err) {
      return next(err);
    }
    res.render('hosts/edit', { host: {} });
  });
});

//글을 쓸 경우 데이터의 값을 받는다.
router.post('/', function (req, res, next) {
  var newHost = new Host({
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
    country : req.body.country,
    address : req.body.address,
    price : req.body.price,
    service : req.body.service,
    rule : req.body.rule,
  });

  newHost.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/hosting_f');
    }
  });
});

module.exports = router;