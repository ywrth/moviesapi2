const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const cors = require('cors'); 
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

//CONNECT
//mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true },
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());


// Initialize passport and set up passport strategies (local and JWT)
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


// CORS
const allowedOrigins = ['http://localhost:1234']; 
app.use(cors());


//WELCOME
app.get('/', (req, res) => {
  res.send('Welcome to HOT POTATOES');
});


//READ THE LIST OF ALL MOVIES
app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => res.status(200).json(movies))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//GET THE MOVIE [:TITLE]
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Title } = req.params;

    Movies.findOne({ Title })
      .then((movie) => {
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(400).json('Movie not found.');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//GET THE INFO ABOUT GENRE [:NAME]
app.get(
  '/movies/genre/:Name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Name } = req.params;

    Movies.findOne({ 'Genre.Name': Name })
      .then((movie) => {
        if (movie) {
          res.status(200).json(movie.Genre);
        } else {
          res.status(400).json('Genre not found.');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//GET THE DIRECTOR [:NAME]
app.get(
  '/movies/director/:Name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Name } = req.params;

    Movies.findOne({ 'Director.Name': Name })
      .then((movie) => {
        if (movie) {
          res.status(200).json(movie.Director);
        } else {
          res.status(400).json('Director not found.');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);


// UPDATE YOUR USER INFO
app.put('/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);


// CREATE A NEW USER
app.post(
  '/users',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        }

        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => res.status(201).json(user))
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

// ADD TO FAV (POST)
app.post(
  '/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Username, MovieID } = req.params;

    Users.findOneAndUpdate(
      { Username },
      { $addToSet: { FavoriteMovies: MovieID } },
      { new: true }
    )
      .then((updatedUser) => res.status(201).json(updatedUser))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

// DELETE A MOVIE FROM FAVS
app.delete(
  '/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Username, MovieID } = req.params;

    Users.findOneAndUpdate(
      { Username },
      { $pull: { FavoriteMovies: MovieID } },
      { new: true }
    )
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

// DELETE USER
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { Username } = req.params;

    Users.findOneAndRemove({ Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(Username + ' was not found.');
        } else {
          res.status(200).send(Username + ' was deleted.');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
