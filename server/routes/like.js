const express = require('express');
const { Like, Post, User } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// 좋아요 추가 
router.post('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // 좋아요 생성
    const like = await Like.create({ postId, userId });
    res.status(201).json(like);
  } catch (error) {
    console.error('Error liking post:', error.message);
    next(error);
  }
});

// 좋아요 취소 
router.delete('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // 기존 좋아요를 찾고 제거
    const existingLike = await Like.findOne({ where: { postId, userId } });
    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ message: 'Like removed' });
    }

    res.status(404).json({ message: 'Like not found' });
  } catch (error) {
    console.error('Error unliking post:', error.message);
    next(error);
  }
});

// 로그인한 사용자가 좋아요를 누른 게시글 목록 가져오기
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 사용자가 누른 모든 좋아요를 찾고 게시글 ID 목록을 반환
    const likes = await Like.findAll({ where: { userId } });
    const likedPostIds = likes.map(like => like.postId);

    res.status(200).json({ likedPostIds });
  } catch (error) {
    console.error('Error fetching liked posts:', error.message);
    next(error);
  }
});

module.exports = router;
