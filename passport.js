const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const bcrypt = require('bcrypt');

let Users = Models.User;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      try {
        const user = await Users.findOne({ Username: username });
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, { message: 'Incorrect username or password.' });
        }
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      } catch (error) {
        console.log(error);
        return callback(error);
      }
    }
  )
);
