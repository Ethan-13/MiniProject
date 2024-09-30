const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Public route to fetch all news
router.get('/allnews', newsController.getAllNews);

module.exports = router;

