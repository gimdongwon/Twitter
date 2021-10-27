const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn } = require('./middlewares');
const { Post, Hashtag } = require('../models');

const router = express.Router();

// uploads 폴더 읽기
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error(error);
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          });
        })
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:id/like', async (req, res, next) => {
  try {
    await Post.update(
      {
        likes: req.body.likeCount + 1,
      },
      {
        where: { id: parseInt(req.params.id) },
      }
    );
    res.status(200).json({ likes: req.body.likeCount + 1 });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: parseInt(req.params.id) },
    });
    res.send('success delete');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
