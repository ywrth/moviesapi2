const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Models = require('./models.js');
const bcrypt = require('bcrypt');

const Users = Models.User;

// JWT Configuration
const jwtSecret = 'your_jwt_secret'; // Replace with your actual JWT secret key

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: ['HS256'],
};

// LocalStrategy for username/password login
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);

// JWTStrategy for token-based authentication
passport.use(
  new JwtStrategy(jwtOptions, async (payload, callback) => {
    try {
      const user = await Users.findById(payload._id);
      if (user) {
        return callback(null, user);
      }
      return callback(null, false);
    } catch (error) {
      return callback(error, false);
    }
  })
);
