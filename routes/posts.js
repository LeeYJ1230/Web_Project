var express = require('express'),
  Post = require('../models/Post');
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
  Post.find({}, function (err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', { posts: posts });
  });
});

//글쓰기
router.get('/new', function (req, res, next) {
  Post.find({}, function (err, posts) {
    res.render('posts/edit', { post: {} });
  });
});

//상세보기
router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    post.save(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.render('posts/show', { post: post });
    //조회수를 세어준다.
    post.read = post.read + 1;
  });
});

//글수정
router.get('/:id/edit', function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', { post: post });
  });
});

//글을 쓸 경우 데이터의 값을 받는다.
router.post('/', function (req, res, next) {
  var newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    country : req.body.country,
    address : req.body.address,
    price : req.body.price,
    service : req.body.service,
    rule : req.body.rule,
  });

  newPost.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/posts');
    }
  });
});

//조건을 확인해 게시글을 수정한다.
router.put('/:id', function (req, res, next) {
  Post.findById({ _id: req.params.id }, function (err, post) {
    if (err) {
      return next(err);
    }

    if (!post) {
      return res.redirect('back');
    }

    //if (post.password !== req.body.password) {
    //  return res.redirect('back');
    //}

    post.title =  req.body.title;
    postcontent = req.body.content;
    postcountry = req.body.country;
    postaddress = req.body.address;
    postprice = req.body.price;
    postservice = req.body.service;
    postrule = req.body.rule;

    post.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/posts');
    });
  });
});

//글을 삭제한다.
router.delete('/:id', function (req, res, next) {
  Post.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

module.exports = router;