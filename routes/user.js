//Router Setup
const express = require('express');
const router = express();
//Secondary Req.
const validateEmail = require('../HelperFunctions/emailValidator');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
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
  const { name, email, password, password2 } = req.body;
  const errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in the fields' })
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }
  if (password.length < 5) {
    errors.push({ msg: 'Incorrect password length' })
  }
  // if (validateEmail(email)) {
  //   errors.push({ msg: 'Invalid Email' });
  // }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
      User.findOne(user => {
        if (user) {
          errors.push({ msg: 'User already exists' });
          res.render('register', {
            errros,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          //Hashing
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Hash assig.
              newUser.password = hash;
              //Save the user
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Logged In!')
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            })
          )
        }
      })
  }
})

//login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


//Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Logged Out!');
  res.redirect('/users/login');
})
module.exports = router;
