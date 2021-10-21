const express = require('express');
const { Post, User } = require('../models');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', { title: '회원가입 - Twitter' });
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'Twitter',
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
