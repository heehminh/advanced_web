const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models'); 
const { isAuthenticated } = require('../middlewares/auth'); 
const router = express.Router();

// 사용자 회원가입을 처리하는 라우트
router.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body;
  const errors = {};

  // 이메일 유효성 검사
  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Email is not valid';
    }
  }

  // 비밀번호 유효성 검사
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // 유효성 검사 실패 시 오류 메시지 반환
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

const jwt = require('jsonwebtoken');

// 사용자 로그인을 처리하는 라우트
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 토큰 생성
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('hi mini token',token);

      // 사용자 정보와 토큰을 함께 응답
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
});


// 카카오 로그인을 위한 라우트
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백 라우트
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  const token = req.user; // 사용자 토큰 정보 (예: JWT 토큰)
  res.locals.auth_token = token;
  res.redirect('http://localhost:3001');
});

// 인증된 사용자 정보를 반환하는 라우트
router.get('/user', isAuthenticated, (req, res) => {
  res.json(req.user);
});

module.exports = router;
