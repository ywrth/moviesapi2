const Models = require('./models.js');
const mongoose = require('mongoose');
const Movie = Models.Movie;
const Users = Models.User;
const express = require('express');
const app = express();
const morgan = require('morgan');
const uuid = require('uuid');
app.use(express.json());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true });


// CREATE user
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// GET ALL USERS

app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET A USER BY USERNAME

app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// UPDATE user by USERNAME

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});


// Add a movie to a user's list of favorites

app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  try {
    const user = await Users.findOne({ Username: req.params.Username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the movie is already in the user's favorite movies list
    if (user.FavoriteMovies.includes(req.params.MovieID)) {
      return res.status(400).send('Movie already in favorites');
    }

    user.FavoriteMovies.push(req.params.MovieID);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndRemove({
      Username: req.params.Username
    });
    if (deletedUser) {
      res.status(200).send(req.params.Username + ' was deleted.');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});


// CREATE movie
app.post('/users/:id/:movieTitle', async (req, res) => {
  try {
    const { id, movieTitle } = req.params;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the movie with the given title exists in the topMovies array
    const movie = topMovies.find((movie) => movie.Title === movieTitle);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    // Check if the movie is already in the user's favorite movies list
    if (user.FavoriteMovies.includes(movie._id)) {
      return res.status(400).send('Movie already in favorites');
    }

    user.FavoriteMovies.push(movie._id);
    await user.save();
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});


// DELETE movie
app.delete('/users/:id/favorites/:movieId', async (req, res) => {
  try {
    const { id, movieId } = req.params;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the movie with the given ID exists in the user's favorite movies list
    if (!user.FavoriteMovies.includes(movieId)) {
      return res.status(404).send('Movie not found in favorites');
    }

    // Filter out the movie from the user's favorite movies list
    user.FavoriteMovies = user.FavoriteMovies.filter((favMovieId) => favMovieId.toString() !== movieId);
    await user.save();

    res.status(200).send(`Movie with ID ${movieId} has been removed from user ${id}'s favorites`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});





//READ the list of all movies to the users (CRUD)
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  }
});


//READ the movie my its title
app.get('/movies/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const movie = await Movie.findOne({ Title: title });
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
app.get('/movies/genre/:genreName', async (req, res) => {
  try {
    const { genreName } = req.params;
    const movie = await Movie.findOne({ 'Genre.Name': genreName });
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
app.get('/movies/directors/:directorName', async (req, res) => {
  try {
    const { directorName } = req.params;
    const movie = await Movie.findOne({ 'Director.Name': directorName });
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



// error-handling

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Houston, we have a problem!' });
};

app.use(errorHandler);


// middleware timestamp/morgan
let requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}

app.use(morgan('combined'))
app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'My absolute favorite movies ever!'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.use(express.static('public'))

app.get('/bio', (req, res) => {
  res.send('Lorem ipsum')
})

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
})
