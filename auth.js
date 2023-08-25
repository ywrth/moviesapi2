const jwt = require('jsonwebtoken');
const jwtSecret = 'mysecret'; 
const passport = require('passport');

require('./passport');

// Function to generate JWT token
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

// Login module
module.exports = (router) => {
  // Import the cors module
  const cors = require('cors');

  // Apply cors middleware for the login route
  router.post('/login', cors(), (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      console.log(user);
      if (error || !user) {
        return res.status(400).json({
          message: 'Houston, we have a problem!',
          user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());

        // Set appropriate headers in the response
        res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
        res.header('Access-Control-Allow-Credentials', true);

        return res.json({ user, token });
      });
    })(req, res);
  });
};
