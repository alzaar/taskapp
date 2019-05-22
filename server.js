//Express Setup
const express = require('express');
const app = express();
const PORT = 3000;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const flash = require('connect-flash');
const session = require('express-session');
//Router
const mainRoute = require('./routes/index');
const user = require('./routes/user');
//DB Setup
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'ejs');
app.use('/', mainRoute);
app.use('/users', user);
//Global Variables
app.use((req, res, next) => {
  req.locals.success_msg = req.flash('success_msg');
  req.locals.error_msg = req.flash('error_msg');
  next();
})
//For Starting the server
app.listen(PORT, () => { console.log(`Listening at ${PORT}`) });
