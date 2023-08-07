const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = 'mysecret'; 
const bcrypt = require('bcrypt');

require('./passport');

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
    router.post('/login', (req, res) => {
      passport.authenticate('local', { session: false }, (error, user, info) => {
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

