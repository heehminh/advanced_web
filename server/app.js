const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Importing routes
const indexRouter = require('./routes/auth');
// const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const likeRouter = require('./routes/like');

const app = express();
app.set('port', process.env.PORT || 3000);
passportConfig();

// 데이터베이스 동기화
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronization successful!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

// 바디 파서 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS 설정
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(passport.initialize());
app.use(passport.session());


// JWT 토큰 인증 미들웨어
app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: '인증 실패' });
      }
      req.user = decoded; // 사용자 정보를 요청 객체에 추가
      next();
    });
  } else {
    next();
  }
});

// Use routes
app.use('/auth', indexRouter);
// app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/like', likeRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}에서 대기중`);
});
