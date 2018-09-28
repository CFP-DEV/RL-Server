const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// @route   POST register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  //*** Validation goes here

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

          // Hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              // Save User to DB
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});

// @route   POST login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  //*** Validation goes here

  const errors = {};

  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ name: name }).then(user => {
    // Check if user exists
    if (!user) {
      errors.name = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Setup JWT
        const payload = { id: user._id };
        // Sign Token
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.status(200).json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password incorrect';
        res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
