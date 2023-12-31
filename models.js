const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @fileOverview Defines Movie and User Mongoose schemas and models.
 * @module models
 */

/**
 * Schema for the Movie.
 * @typedef {Object} MovieSchema
 * @property {string} Title - The title of the movie.
 * @property {string} Description - A brief description of the movie.
 * @property {Object} Genre - The genre of the movie.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - A brief description of the genre.
 * @property {Object} Director - The director of the movie.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - A short biography of the director.
 * @property {string[]} Actors - A list of main actors in the movie.
 * @property {string} ImagePath - A link or path to the movie's poster image.
 * @property {boolean} Featured - Indicates whether the movie is featured.
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Schema for the User.
 * @typedef {Object} UserSchema
 * @property {string} Username - The user's unique username.
 * @property {string} Password - The user's hashed password.
 * @property {string} Email - The user's email address.
 * @property {Date} Birthday - The user's date of birth.
 * @property {mongoose.Schema.Types.ObjectId[]} FavoriteMovies - A list of favorite movies (references to Movie documents).
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Static method to hash a password.
 * @function
 * @param {string} password - The plain text password to hash.
 * @returns {string} - A hashed password.
 */
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

/**
 * Method to validate the user's password.
 * @function
 * @param {string} password - The plain text password to validate.
 * @returns {boolean} - `true` if the password matches, otherwise `false`.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Mongoose model for the Movie schema.
 * @type {mongoose.Model}
 */
let Movie = mongoose.model("Movie", movieSchema);

/**
 * Mongoose model for the User schema.
 * @type {mongoose.Model}
 */
let User = mongoose.model("User", userSchema);

// Export the models
module.exports.Movie = Movie;
module.exports.User = User;
