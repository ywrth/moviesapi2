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

// Mount the auth routes
const authRoutes = require('./auth.js')(app);



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



// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
