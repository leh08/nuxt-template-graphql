const auth = require("../middlewares/auth");
const { Router } = require("express");

const router = Router();

// Initialize Controller
const articlesController = require("../controllers/articlesController");

// Get All
router.get("/articles", articlesController.list);

// Get One
router.get("/articles/:id", articlesController.show);

// Create
router.post("/articles", auth.isAuthenticated, articlesController.create);

// Update
router.put("/articles/:id", auth.isAuthenticated, articlesController.update);

// Delete
router.delete("/articles/:id", auth.isAuthenticated, articlesController.delete);

module.exports = router;
