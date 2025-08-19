const express = require("express");
const router = express.Router();

const searchController = require("../controllers/search");

// ADDED: basic search and suggestions routes
router.get("/", searchController.search); // ADDED
router.get("/suggest", searchController.suggest); // ADDED (optional)

module.exports = router;
