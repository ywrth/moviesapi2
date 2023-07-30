const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = 'your_jwt_secret'; // Replace with your actual JWT secret key
const bcrypt = require('bcrypt');

// Import the Users model
const Users = require('./models').User;

module.exports = (router) => {
  // ... (other routes and code)

  // Register a new user
  router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10); // Hash the password with a salt of 10 rounds
      const newUser = new Users({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    }
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
