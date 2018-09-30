require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const edge = require('edge.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const authController = require('./lib/controllers/AuthController');
const userController = require('./lib/controllers/UserController');
const levelsController = require('./lib/controllers/LevelsController');

// Static Files (Public)
app.use(express.static('./public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(db,  { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Template Engine
edge.registerViews(path.join(__dirname, './resources/views'));

// Router
app.use('/', require('./routes/routes.js'));
app.use('/', authController);
app.use('/api/levels', levelsController);
app.use('/api/users', userController);

// Listen
app.listen(process.env.PORT, () => {
  // Message
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
