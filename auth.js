const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = 'your_jwt_secret'; 
const bcrypt = require('bcrypt');

// Import the Users model
const Users = require('./models').User;

module.exports = (router) => {
  // ... (other routes and code)

  // Register a new user
  router.post('/register', async (req, res) => {
    User.findOne({ Email: req.body.Email }).exec((error, user) => {
      if (user) {
        return res.status(400).json({
          message: 'User already exists.',
        });
      }

      const { Username, Password, Email } = req.body;
      const hashedPassword = User.hashPassword(Password); // Use the static method here

      const _user = new User({
        Username,
        Password: hashedPassword,
        Email,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: 'Something went wrong',
          });
        }
        if (data) {
          return res.status(201).json({
            user: data,
          });
        }
      });
    });
  });

  

  // Login
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(401).json({ message: 'Authentication failed. Incorrect username or password.' });
      }
      // If authentication is successful, generate and send the JWT token
      const token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    })(req, res);
  });


};

// Function to generate JWT token
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '1d', // Token expires in 1 day, you can adjust as needed
    algorithm: 'HS256',
  });
};
