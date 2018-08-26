const express = require('express');
const router = express.Router();
const edge = require('edge.js')
const path = require('path');

// Home
router.get('/', (req, res) => {
    res.send('test');
});

module.exports = router;