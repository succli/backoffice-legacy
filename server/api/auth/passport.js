// Load modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../user/User');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local');

/**
 * Local login strategy for User login
 */
const localLogin = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (error, user) => {
    if (error) {
      return done(error);
    }

    if (!user) {
      return done(null, false);
    }

    if (!user.validPassword(password, user.password)) {
      return done(null, false);
    }

    return done(null, user);
  });
});

/**
 * Json Web Token authentication strategy
 */
const jwtAuth = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
}, (payload, done) => {
  User.find({ id: payload.sub }, (error, user) => {
    if (error) {
      return done(error, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtAuth);
