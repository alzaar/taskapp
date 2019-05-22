//Router setup
const express = require('express');
const router = express();
const user = require('./user');
const { isAuth } = require('../config/auth');
//Routes
router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', isAuth, (req, res) => {
  res.render('dashboard', {
    user: req.user
  })
})

module.exports = router;
