const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

// LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// 세션에 사용자 정보를 저장
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// 세션에서 사용자 정보를 복구
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
