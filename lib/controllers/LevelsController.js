const express = require('express');
const router = express.Router();
const Levels = require('../models/Levels');
/*
- getLevels - returns all levels from the database
- setLevel - edit / create level
- getLevel - get single level
*/

const errors = {};

//getLevels 
router.get('/levels', (req, res) => {
    Levels.find().then(levels => {
        if(!levels){
            errors.levels = "Could not find levels";
            res.status(404).json(errors);
        } else {
            res.status(200).json(levels);
        }
    });
});

//getLevel 
router.get('/levels/ID', (req, res) => {
    Levels.findOne({ ID: res.body.id}).then(level => {
        if(!level){
            errors.level = "Could not find level";
            res.status(404).json(errors);
        } else {
            res.status(200).json(level);
        }
    });
});

//setLevel 
router.post('/levels/ID', (req, res) => {
    
});

module.exports = router;