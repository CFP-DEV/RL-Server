const express = require('express');
const router = express.Router();
const edge = require('edge.js');
const path = require('path');

// Home
router.get('/', (req, res) => {
  res.send('test');
});

// @route   GET register
// @desc    Show registration page
// @access  Public
// router.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'register.html'));
// });

module.exports = router;
