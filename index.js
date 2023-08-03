const Models = require('./models.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const uuid = require('uuid');
const passport = require('passport'); 
const cors = require('cors'); // import the CORS middleware
const bcrypt = require('bcrypt'); // import bcrypt for password hashing
const { check, validationResult } = require('express-validator');

app.use(express.json());

// CORS

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true }

// Initialize passport and set up passport strategies (local and JWT)
require('./passport');

// Load the User model
const Users = Models.User;

// AUTH
let auth = require('./auth')(app);



// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Houston, we have a problem!' });
};

app.use(errorHandler);

// Middleware timestamp/morgan
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(morgan('combined'));
app.use(requestTime);

//READ the list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Models.Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

//GET the movies via title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Models.Movie.findOne({ Title: req.params.title });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

//GET genre 
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Models.Movie.findOne({ 'Genre.Name': req.params.genreName });
    if (movie) {
      res.status(200).json(movie.Genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

//GET director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Models.Movie.findOne({ 'Director.Name': req.params.directorName });
    if (movie) {
      res.status(200).json(movie.Director);
    } else {
      res.status(404).send('Director not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// Update user info - PUT request
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Check if the authenticated user's username matches the one in the request parameter
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }

    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// DELETE user 
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Check if the authenticated user's username matches the one in the request parameter
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send('Permission denied');
    }

    // Delete the user
    await Users.findOneAndRemove({ Username: req.params.Username });

    res.send('User deregistered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// POST to favorites
app.post('/api/users/:userId/movies/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Add the movie ID to the user's favoriteMovies array
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { favoriteMovies: req.params.movieId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    res.send('Movie added to favorites.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// DELETE from favorites
app.delete('/api/users/:userId/movies/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Remove the movie ID from the user's favoriteMovies array
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { favoriteMovies: req.params.movieId } }, // Use $pull to remove the movie ID from the array
      { new: true }
    );

    res.send('Movie removed from favorites.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});