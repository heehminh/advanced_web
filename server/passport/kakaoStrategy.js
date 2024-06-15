const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (profile, done) => {
    try {
      // 카카오에서 제공하는 유저 정보를 이용하여 데이터베이스 조회 또는 생성
      const exUser = await User.findOne({ where: { kakaoId: profile.id, provider: 'kakao' } });

      if (exUser) {
        const token = jwt.sign(
          {
            userId: exUser.userId,
          },
          process.env.JWT_SECRET
        )
        // 이미 등록된 사용자일 경우
        return done(null, exUser, token); 
      } else {
        // 새로운 사용자일 경우
        const newUser = await User.create({
          email: profile._json && profile._json.kakao_account.email,
          name: profile.displayName,
          kakaoId: profile.id,
          provider: 'kakao',
        });

        const token = jwt.sign(
          {
            userId: newUser.userId,
          },
          process.env.JWT_SECRET
        )
        return done(null, newUser, token);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
