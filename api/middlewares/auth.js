const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.isAuthenticated = async (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    token = token.replace(/^Bearer\s/, "");
    // verifies secret and checks if the token is expired
    jwt.verify(token, config.authSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        const user = await User.findOne({
          _id: decoded._id,
          "tokens.token": token,
        });
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.token = token;
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Missing token" });
  }
};
