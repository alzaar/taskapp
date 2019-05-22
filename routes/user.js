//Router Setup
const express = require('express');
const router = express();
//Routes
router.get('/login', (req, res) => {
  res.render('login');
});
//@desc Test
//GET /register
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('hello');
})
module.exports = router;
