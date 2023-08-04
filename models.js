const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Movie schema 
const movieSchema = mongoose.Schema({
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

// User schema
const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

// Define validatePassword method for the User model
userSchema.methods.validatePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.Password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create the Movie and User models
const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

// Export the models
module.exports = {
  Movie: Movie,
  User: User,
};
