const express = require('express');
const { Post } = require('../models');

const router = express.Router();

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
