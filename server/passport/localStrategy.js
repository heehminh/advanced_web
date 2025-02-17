const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: '존재하지 않는 회원입니다.' });
      }

      if (user.provider === 'kakao') {
        return done(null, false, { message: '카카오 계정으로 가입된 회원입니다.' });
      }

      const result = await bcrypt.compare(password, user.password);

      if (result) {
        return done(null, user);
      }
      
      return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
