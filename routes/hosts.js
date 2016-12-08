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
    res.render('hosts/index', { hosts: hosts });
  });
});

//글쓰기
router.get('/new', function (req, res, next) {
  Host.find({}, function (err, hosts) {
    res.render('hosts/edit', { host: {} });
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
    res.render('hosts/show', { host: host });
    //조회수를 세어준다.
    host.read = host.read + 1;
  });
});

//글수정
router.get('/:id/edit', function (req, res, next) {
  Host.findById(req.params.id, function (err, host) {
    if (err) {
      return next(err);
    }
    res.render('hosts/edit', { host: host });
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
      res.redirect('/hosts');
    }
  });
});

//조건을 확인해 게시글을 수정한다.
router.put('/:id', function (req, res, next) {
  Host.findById({ _id: req.params.id }, function (err, host) {
    if (err) {
      return next(err);
    }

    if (!host) {
      return res.redirect('back');
    }

    //if (host.password !== req.body.password) {
    //  return res.redirect('back');
    //}

    host.email = req.body.email;
    host.title =  req.body.title;
    host.content = req.body.content;
    host.country = req.body.country;
    host.address = req.body.address;
    host.price = req.body.price;
    host.service = req.body.service;
    host.rule = req.body.rule;

    host.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/hosts');
    });
  });
});

//글을 삭제한다.
router.delete('/:id', function (req, res, next) {
  Host.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/hosts');
  });
});

module.exports = router;