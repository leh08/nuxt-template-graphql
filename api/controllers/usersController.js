const auth = require("../middlewares/auth");
const User = require("../models/User");
const validator = require("express-validator");

// Register
module.exports.register = [
  validator.body("full_name", "Please enter Full Name").isLength({ min: 1 }),
  validator.body("email", "Please enter Email").isLength({ min: 1 }),
  validator.body("email", "Email is invalid").isEmail(),
  validator.body("email").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user !== null) {
      throw new Error("Email already in use");
    }
  }),
  validator.body("password", "Please enter Password").isLength({ min: 1 }),

  async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    // initialize record
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).json({
        message: "saved",
        _id: user._id,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error saving record",
        error: e,
      });
    }
  },
];

// Login
module.exports.login = [
  validator.body("email", "Please enter Email").isLength({ min: 1 }),
  validator.body("email", "Email is invalid").isEmail(),
  validator.body("password", "Please enter Password").isLength({ min: 1 }),
  async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  },
];

// Get User
module.exports.me = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.json();
  } catch (e) {
    res.status(500).json();
  }
};
