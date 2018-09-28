const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// @route TEST
// @desc TEST
// @access PRIVATE
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  requireAdmin(),
  (req, res) => {
    res.json({ test: 'This is a route test' });
  }
);

// @route   Get api/users/
// @desc    Get users information
// @access  Public
router.get('/', (req, res) => {
  const errors = {};

  User.find()
    // .select('name level registration_date role issuspended')
    .then(users => {
      if (!users) {
        errors.nousers = 'There are no users';
        return res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({ user: 'There are no users' }));
});

// @route   Get api/users/:id
// @desc    Get user information
// @access  Public
router.get('/:id', (req, res) => {
  const errors = {};

  User.findOne({ _id: req.params.id })
    .select('-password')
    .then(user => {
      if (!user) {
        errors.nouser = "This user doesn't exist";
        return res.status(404).json(errors);
      }

      res.json(user);
    })
    .catch(err => {
      res.status(404).json({ user: "This user doesn't exist" });
    });
});

// @route   Put api/users/:id
// @desc    Update user information
// @access  Public
router.put('/:id', (req, res) => {
  if (req.body.password) {
    // Udpate password
    User.findOne({ _id: req.params.id }).then(user => {
      if (user) {
        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return console.log(`An error has occured: ${err}`);
            }
            // Update
            User.findOneAndUpdate(
              { _id: req.params.id },
              { password: hash },
              { new: true }
            )
              .then(user => res.status(200).json(user))
              .catch(err =>
                res.status(400).json({ error: 'An error has occured' })
              );
          });
        });
      }
    });
  } else {
    const errors = {};

    // Update user
    const userFields = {};
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.name) userFields.name = req.body.name;
    if (req.body.currency) userFields.currency = req.body.currency;
    if (req.body.premiumcurrency)
      userFields.premiumcurrency = req.body.premiumcurrency;
    if (req.body.experience) userFields.experience = req.body.experience;
    if (req.body.level) userFields.level = req.body.level;
    if (req.body.registration_date)
      userFields.registration_date = req.body.registration_date;
    if (req.body.role) userFields.role = req.body.role;
    if (req.body.status) userFields.status = req.body.status;
    if (req.body.issuspended) userFields.issuspended = req.body.issuspended;

    // Check if email already exists
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        res.status(400).json(errors);
      } else {
        // Check if username already taken
        User.findOne({ name: req.body.name }).then(user => {
          if (user) {
            errors.name = 'Choose another username';
            res.status(400).json(errors);
          } else {
            // If no errors, Update the user
            User.findOne({ _id: req.params.id })
              .then(user => {
                if (user) {
                  // Update
                  User.findOneAndUpdate(
                    { _id: req.params.id },
                    { $set: userFields },
                    { new: true }
                  ).then(user => res.status(200).json(user));
                }
              })
              .catch(err =>
                res.status(400).json({ user: 'An error has occured' })
              );
          }
        });
      }
    });
  }
});

function requireAdmin() {
  return function(req, res, next) {
    if (req.user.role === 'administrator' || req.user.role === 'moderator') {
      next();
    } else {
      res.json({ unauthorised: 'Unauthorised' });
    }
  };
}

module.exports = router;
