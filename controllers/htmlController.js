const path = require("path");
const express = require('express');
const router = express.Router();

// index route loads view.html
router.get("/", function(req, res) {
  // res.sendFile(path.join(__dirname, "../public/index.html"));
  res.sendFile("http://www.google.com");
});

module.exports = router;