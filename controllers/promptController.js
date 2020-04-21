const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require("../models");

router.post("/api/new", function(req, res) {
  var answer = req.body.answer.toLowerCase();
  db.Prompt.create({
    text: req.body.text,
    answer: answer
  })
  .then((prompt) => {
    res.json(prompt)
  })
  .catch((error) => {
    res.status(500).json(error)
  })
});

module.exports = router;