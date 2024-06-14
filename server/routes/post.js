const express = require('express');
const path = require('path');
const { Post, User, Like } = require('../models'); 
const { isAuthenticated } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

// 게시글 작성
router.post('/create', isAuthenticated, upload.array('images', 10), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const post = await Post.create({
      title,
      content,
      imageUrls: JSON.stringify(imageUrls), // 이미지 URL을 JSON 문자열로 저장
      userId,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error.message);
    next(error);
  }
});

// 모든 게시글 조회 
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name'],
        as: 'User',
      }],
    });
    // 이미지 URL을 JSON 파싱
    posts.forEach(post => {
      if (typeof post.imageUrls === 'string') {
        post.imageUrls = JSON.parse(post.imageUrls);
      }
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
        attributes: ['id', 'name'],
        as: 'User',
      }],
    });
    // 이미지 URL을 JSON 파싱
    posts.forEach(post => {
      if (typeof post.imageUrls === 'string') {
        post.imageUrls = JSON.parse(post.imageUrls);
      }
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching my posts:', error.message);
    next(error);
  }
});

// 특정 게시글 조회 
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
    // 이미지 URL을 JSON 파싱
    if (typeof post.imageUrls === 'string') {
      post.imageUrls = JSON.parse(post.imageUrls);
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    next(error);
  }
});

// 게시글의 이미지 삭제 
router.post('/:id/delete-images', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { images } = req.body;
    
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingImages = JSON.parse(post.imageUrls);
    const updatedImages = existingImages.filter(image => !images.includes(image));

    post.imageUrls = JSON.stringify(updatedImages);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error deleting images:', error.message);
    next(error);
  }
});

// 게시글 삭제 
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findOne({ where: { id: postId, userId } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not authorized to delete this post' });
    }

    // likes 테이블에서 관련 레코드 삭제
    await Like.destroy({ where: { postId } });

    // 포스트 삭제
    await post.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error.message);
    next(error);
  }
});

module.exports = router;
