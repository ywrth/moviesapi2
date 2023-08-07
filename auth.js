const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret'; 
const passport = require('passport');
const bcrypt = require('bcrypt');

const app = require('./index.js');

// Function to generate JWT token
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '1d', // Token expires in 1 day, you can adjust as needed
    algorithm: 'HS256',
  });
};

  // Login module
  module.exports = (router) => {
    app.post('/login', (req, res, next) => {
      passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(user);
        if (error || !user) {
          return res.status(400).json({
            message: 'Something went wrong',
            user,
          });
        }
        req.login(user, { session: false }, (error) => {
          if (error) {
            res.send(error);
          }
          let token = generateJWTToken(user.toJSON());
          return res.json({ user, token });
        });
      })(req, res);
    });
  };

