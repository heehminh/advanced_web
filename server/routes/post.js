const express = require('express');
const { Post, User, Book } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // 파일 업로드 미들웨어
const fs = require('fs');
const path = require('path');

const router = express.Router();

// 이미지 base64인코딩
const encodeFileToBase64 = (filePath) => {
  const bitmap = fs.readFileSync(filePath);
  return Buffer.from(bitmap).toString('base64');
};

// POST /create: 숙소 생성
router.post('/create', isAuthenticated, upload.array('photos', 10), async (req, res, next) => {
  try {
    const { address, category, price, description } = req.body;
    const userId = req.user.id;
    const photos = req.files.map(file => `/uploads/${file.filename}`);

    const post = await Post.create({
      address,
      category,
      price,
      description,
      photos, 
      userId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

// /:id/edit-post: id로 숙소 수정
router.put('/:id/edit-post', isAuthenticated, upload.array('photos', 10), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { address, category, price, description, existingPhotos } = req.body;
    const userId = req.user.id;

    const post = await Post.findOne({ where: { id, userId } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to edit this post' });
    }

    // 기존 photos 데이터 처리
    let updatedPhotos;
    try {
      updatedPhotos = typeof post.photos === 'string' ? JSON.parse(post.photos) : post.photos;
    } catch (e) {
      updatedPhotos = [];
    }

    // 새로 업로드된 이미지 URL 추가
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => ({
        path: `/uploads/${file.filename}`,
        base64: encodeFileToBase64(file.path)
      }));
      updatedPhotos = [...updatedPhotos, ...newPhotos];
    }

    // 기존 이미지 중 유지할 이미지를 필터링
    if (existingPhotos) {
      updatedPhotos = updatedPhotos.filter(photo => existingPhotos.includes(photo.path));
    }

    // 게시글 정보 업데이트
    await post.update({
      address: address || post.address,
      category: category || post.category,
      price: price || post.price,
      description: description || post.description,
      photos: JSON.stringify(updatedPhotos),
    });

    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error.message);
    next(error);
  }
});

// GET /: 모든 숙소 목록 
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name'],
        as: 'User',
      }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    next(error);
  }
});

// 사용자의 게시글 조회
router.get('/myposts', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const posts = await Post.findAll({
      where: { userId },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email'],
        as: 'User',
      }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching my posts:', error.message);
    next(error);
  }
});

// id로 숙소정보 조회
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'name'],
        as: 'User',
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    next(error);
  }
});

// DELETE /:id 숙소 삭제
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findOne({ where: { id: postId, userId } });
    if (!post) {
      return res.status(404).json({ message: '사용자 인증 안됨' });
    }

    await Book.destroy({ where: { postId } });

    await post.destroy();
    res.status(204).end();
    
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
