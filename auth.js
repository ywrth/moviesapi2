const jwt = require("jsonwebtoken");
const jwtSecret = "mysecret";
const passport = require("passport");

require("./passport");

/**
 * Generates a JWT token for user authentication.
 *
 * @function
 * @param {Object} user - The user object for which the token is generated.
 * @returns {string} - A JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/**
 * @fileOverview Login module for the application.
 * @module login
 */

/**
 * Sets up the login route.
 *
 * @function
 * @param {Object} router - The Express router object.
 */
module.exports = (router) => {
  /**
   * Route to authenticate and log in a user.
   *
   * @function
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} - JSON object containing user details and JWT token.
   */
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      console.log("auth endpoint: ", user);
      console.log("error: ", error);
      if (error || !user) {
        console.log(error);
        return res.status(400).json({
          message: "Houston, we have a problem!",
          user,
        });
      }
      req.login(user, { session: false }, (error) => {
        console.log(error);
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        // Added Access Control to response header to unblock UI for CORS
        res.set("Access-Control-Allow-Origin", "*");
        let reply = res.json({ user, token });
        return reply;
      });
    })(req, res);
  });
};
