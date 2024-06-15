const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// POST /register: 회원가입
router.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body;
  const errors = {};

  // email
  if (!email) {
    errors.email = '이메일을 입력하세요.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = '이메일이 올바르지 않습니다.';
    }
  }

  // password
  if (!password) {
    errors.password = '비밀번호를 입력하세요.';
  } else if (password.length < 6) {
    errors.password = '비밀번호는 6자리 이상이여야 합니다.';
  }

  // 오류
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    // 이메일 중복 검사
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(409).json({ email: '이미 존재하는 이메일입니다.' });
    }
    // 비밀번호 해싱 후 사용자 정보 저장
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      password: hash,
    });
    return res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// POST /login 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 토큰 생성
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // 사용자 정보와 토큰을 함께 응답
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
});

// 카카오 로그인 
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백 
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // 사용자 정보와 토큰을 함께 응답 
  res.redirect(`http://localhost:3001?token=${token}`);
});

// 인증된 사용자 정보를 반환하는 라우트
router.get('/user', isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
