//예약하기 위한 게시판 페이지
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
    res.render('reserve/index', { hosts: hosts });
  });
});

//상세보기
router.get('/:id', function (req, res, next) {
  Host.findById(req.params.id, function (err, host) {
    if (err) {
      return next(err);
    }
    host.save(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.render('reserve/show', { host: host });
    //조회수를 세어준다.
    host.read = host.read + 1;
  });
});

module.exports = router;