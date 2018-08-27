const express = require('express');
const router = express.Router();
const edge = require('edge.js');
const path = require('path');
const passport = require('passport');
const User = require('../lib/models/User');

// Home
router.get('/', (req, res) => {
  res.send('test');
});

// @route   GET register
// @desc    Show registration page
// @access  Public
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

// @route   POST register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const errors = {};
  // Check if email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      res.status(400).json(errors);
    } else {
      // Check if username already taken
      User.findOne({ name: req.body.username }).then(user => {
        if (user) {
          errors.name = 'Choose another username';
          res.status(400).json(errors);
        } else {
          // If no errors, create a new user
          const newUser = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }
      });
    }
  });
});

module.exports = router;
