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

/// LocalStrategy for username/password login
passport.use(new LocalStrategy((username, password, done) => {
  Models.User.findOne({ Username: username })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Validate the password by hashing the provided password and comparing it to the stored hashed password
      bcrypt.compare(password, user.Password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If the username and password are correct, return the user
        return done(null, user);
      });
    })
    .catch((err) => done(err));
}));

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
