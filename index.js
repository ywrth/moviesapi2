/**
 * @fileOverview Main server file for the HOT POTATOES application.
 * @author Ywrth
 * @version 1.0.0
 * @module myFlix
 */

// ==========================
// IMPORTS AND CONFIGURATIONS
// ==========================

/**
 * @module express
 */
const express = require("express");
/**
 * @module morgan
 */
const morgan = require("morgan");
/**
 * @module bodyParser
 */
const bodyParser = require("body-parser");
/**
 * @module mongoose
 */
const mongoose = require("mongoose");
/**
 * Models for the application.
 * @module models
 */
const Models = require("./models.js");
/**
 * @module cors
 */
const cors = require("cors");
/**
 * Validation tools.
 * @module express-validator
 */
const { check, validationResult } = require("express-validator");
/**
 * @module passport
 */
const passport = require("passport");

/**
 * Movies model from the Models module.
 * @const
 */
const Movies = Models.Movie;
/**
 * Users model from the Models module.
 * @const
 */
const Users = Models.User;

/**
 * Initialize express.
 * @type {Object}
 */
const app = express();

// ==========
// MIDDLEWARE
// ==========

app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Configuration for CORS.
 * @const
 */
const corsOptions = {
  origin: ["https://ywrth.github.io", "https://hot-potatoes.netlify.app"], // Add your client's URL here
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/** Initialize Passport. */
require("./auth")(app);
require("./passport");

// ===================
// DATABASE CONNECTION
// ===================

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// ======
// ROUTES
// ======

/** Root route that welcomes users. */
app.get("/", (req, res) => {
  res.send("Welcome to HOT POTATOES");
});

// -----------------
// MOVIE INFORMATION
// -----------------

/**
 * Endpoint to fetch all movies.
 * @returns {Array} A list of movies.
 */
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => res.status(200).json(movies))
    .catch((error) => res.status(500).send("Error: " + error));
});

/**
 * Endpoint to fetch a specific movie by title.
 * @param {string} Title - Movie title.
 * @returns {Object} The found movie.
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) =>
        movie
          ? res.status(200).json(movie)
          : res.status(400).json("Movie not found.")
      )
      .catch((error) => res.status(500).send("Error: " + error));
  }
);

/**
 * Endpoint to fetch genre by its name.
 * @param {string} Name - Genre name.
 * @returns {Object} The found genre.
 */
app.get(
  "/movies/genre/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then((movie) =>
        movie
          ? res.status(200).json(movie.Genre)
          : res.status(400).json("Genre not found.")
      )
      .catch((error) => res.status(500).send("Error: " + error));
  }
);

/**
 * Endpoint to fetch director by its name.
 * @param {string} Name - Director's name.
 * @returns {Object} The found director.
 */
app.get(
  "/movies/director/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movie) =>
        movie
          ? res.status(200).json(movie.Director)
          : res.status(400).json("Director not found.")
      )
      .catch((error) => res.status(500).send("Error: " + error));
  }
);

// -----------------
// USER INFORMATION
// -----------------

/**
 * Endpoint to register a new user.
 */
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
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
          return res.status(400).send(req.body.Username + " already exists");
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
            res.status(500).send("Error: " + error);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to get a user by their username.
 * @param {string} Username - User's username.
 * @returns {Object} The found user.
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { Username } = req.params;

    Users.findOne({ Username })
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).send(Username + " was not found.");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to update a user's information.
 * @param {string} Username - User's username.
 */
app.put(
  "/users/:Username",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  passport.authenticate("jwt", { session: false }),
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
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to fetch a user's favorite movies.
 * @param {string} Username - User's username.
 * @returns {Array} A list of the user's favorite movies.
 */
app.get(
  "/users/:Username/favoriteMovies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          return res.status(400).send(`User ${req.params.Username} not found.`);
        }

        // Get the array of favorite movie IDs from the user object
        const favoriteMoviesIDs = user.FavoriteMovies;

        // Find all movies whose IDs are in the favoriteMoviesIDs array
        Movies.find({
          _id: { $in: favoriteMoviesIDs },
        })
          .then((movies) => {
            if (!movies) {
              return res.status(400).send("No favorite movies found.");
            }

            res.status(200).json(movies);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to add a movie to a user's favorites.
 * @param {string} Username - User's username.
 * @param {string} MovieID - Movie's unique ID.
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
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
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to remove a movie from a user's favorites.
 * @param {string} Username - User's username.
 * @param {string} MovieID - Movie's unique ID.
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
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
        res.status(500).send("Error: " + error);
      });
  }
);

/**
 * Endpoint to delete a user.
 * @param {string} Username - User's username.
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { Username } = req.params;

    Users.findOneAndRemove({ Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(Username + " was not found.");
        } else {
          res.status(200).send(Username + " was deleted.");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// =================
// SERVER START POINT
// =================

/**
 * The port on which the server should run.
 * @type {number}
 */
const port = process.env.PORT || 8080;

/** Start the server. */
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
