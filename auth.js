const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret'; 
const passport = require('passport');

require('./passport');

// Function to generate JWT token for authentication
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

  // Login module
  module.exports = (router) => {
    router.post('/login', (req, res) => {
      passport.authenticate('local', { session: false }, (error, user, info) => {
        console.log('auth endpoint: ', user);
        console.log('error: ', error);
        if (error || !user) {
          console.log(error);
          return res.status(400).json({
            message: 'Houston, we have a problem!',
            user,
          });
        }
        req.login(user, { session: false }, (error) => {
          console.log(error);
          if (error) {
            res.send(error);
          }
          let token = generateJWTToken(user.toJSON());
          //Added Access Control to responmse header to unblock UI for CORS
          res.set("Access-Control-Allow-Origin", "*");
          let reply = res.json({ user, token });
          return reply;
        });
      })(req, res);
    });
  };

