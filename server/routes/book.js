const express = require('express');
const { Book } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// 예약 추가 
router.post('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // 예약 생성
    const book = await Book.create({ postId, userId });
    res.status(201).json(book);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// 로그인한 사용자가 예약한 숙소 목록 가져오기
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // 사용자가 누른 모든 예약을 찾고 게시글 ID 목록을 반환
    const books = await Book.findAll({ where: { userId } });
    const booksPostId = books.map(book => book.postId);

    res.status(200).json({ booksPostId });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    next(error);
  }
});

module.exports = router;
