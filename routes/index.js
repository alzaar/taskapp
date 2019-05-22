//Router setup
const express = require('express');
const router = express();
const user = require('./user');
//Routes
router.get('/', (req, res) => {
  res.render('welcome');
});

module.exports = router;
