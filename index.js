const Models = require('./models.js');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const uuid = require('uuid');
const passport = require('passport'); // Import Passport module

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });

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

//READ the list of all movies to the users (CRUD)
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Models.Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

//READ the movie by its title
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

//READ genre
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

//READ director
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

    // Update the user's information
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

// Remove movie from user's favorite - DELETE request
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


// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
