//Express Setup
const express = require('express');
const app = express();
const PORT = 3000;
const expressLayouts = require('express-ejs-layouts');
//Router
const mainRoute = require('./routes/index');
const user = require('./routes/user');
//Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use('/', mainRoute);
app.use('/users', user);

//For Starting the server
app.listen(PORT, () => { console.log(`Listening at ${PORT}`) });
