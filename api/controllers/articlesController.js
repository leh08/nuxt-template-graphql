const Article = require("../models/Article");
const validator = require("express-validator");

// Get all
module.exports.list = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (e) {
    res.status(500).json({
      message: "Error getting records.",
    });
  }
};

// Get one
module.exports.show = async (req, res) => {
  var id = req.params.id;
  try {
    const article = await Article.findOne({ _id: id });
    if (!article) {
      res.status(404).json({
        message: "No such record",
      });
    }
    res.json(article);
  } catch (e) {
    res.status(500).json({
      message: "Error getting record.",
    });
  }
};

// Create
module.exports.create = [
  // validations rules
  validator.body("title", "Please enter Article Title").isLength({ min: 1 }),
  validator.body("title").custom(async (value) => {
    const article = await Article.findOne({ title: value });
    if (article !== null) {
      throw new Error("Title already in use");
    }
  }),
  validator.body("author", "Please enter Author Name").isLength({ min: 1 }),
  validator.body("body", "Please enter Article Content").isLength({ min: 1 }),

  async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var article = new Article({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body,
    });

    try {
      // save record
      await article.save();
      res.json({
        message: "saved",
        _id: article._id,
      });
    } catch (e) {
      res.status(500).json({
        message: "Error saving record",
        error: err,
      });
    }
  },
];

// Update
module.exports.update = [
  // validation rules
  validator.body("title", "Please enter Article Title").isLength({ min: 1 }),
  validator.body("title").custom(async (value, { req }) => {
    const article = await Article.findOne({
      title: value,
      _id: { $ne: req.params.id },
    });

    if (article !== null) {
      throw new Error("Title already in use");
    }
  }),
  validator.body("author", "Please enter Author Name").isLength({ min: 1 }),
  validator.body("body", "Please enter Article Content").isLength({ min: 1 }),

  async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;

    try {
      const article = await Article.findOne({ _id: id });
      if (!article) {
        res.status(404).json({
          message: "No such record",
        });
      }
      // initialize record
      article.title = req.body.title ? req.body.title : article.title;
      article.author = req.body.author ? req.body.author : article.author;
      article.body = req.body.body ? req.body.body : article.body;
      // save record
      await article.save();
      res.json(article);
    } catch (e) {
      res.status(500).json({
        message: "Error saving record",
        error: e,
      });
    }
  },
];

// Delete
module.exports.delete = async (req, res) => {
  var id = req.params.id;
  const article = await Article.findByIdAndRemove(id);
  try {
    res.json(article);
  } catch (e) {
    res.status(500).json({
      message: "Error deleting record.",
    });
  }
};
