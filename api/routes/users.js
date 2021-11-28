const auth = require("../middlewares/auth");
const { Router } = require("express");

const router = Router();

// Initialize Controller
const usersController = require("../controllers/usersController");

// Register
router.post("/users/register", usersController.register);

// Login
router.post("/users/login", usersController.login);

// Get Use
router.get("/users/me", auth.isAuthenticated, usersController.me);

// Logout
router.delete("/users/logout", auth.isAuthenticated, usersController.logout);

module.exports = router;
