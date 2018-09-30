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
router.get('/', (req, res) => {
    Levels.find().then(levels => {
        if(!levels || levels.length == 0){
            errors.levels = "Could not find levels";
            return res.status(404).json(errors);
        } else {
            return res.status(200).json(levels);
        }
    });
});

//getLevel 
router.get('/:ID', (req, res) => {
    Levels.findOne({ Level: req.params.ID}).then(level => {
        if(!level){
            errors.level = "Could not find level";
            return res.status(404).json(errors);
        } else {
            return res.status(200).json(level);
        }
    });
});

//setLevel 
router.post('/', (req, res) => {
    if(!req || !req.body.Level || !req.body.MaxExperience || !req.body.Rewards.CurrencyReward || !req.body.Rewards.PremiumCurrencyReward) {
        errors.error = 'Missing Information';
        return res.status(406).json(errors);
    }
    const data = {
        MaxExperience: req.body.MaxExperience,
        Rewards: {
            CurrencyReward: req.body.Rewards.CurrencyReward,
            PremiumCurrencyReward: req.body.Rewards.PremiumCurrencyReward,
        }
    }


    const NewLevel = new Levels({
        Level: req.body.Level,
        MaxExperience: req.body.MaxExperience,
        Rewards: {
            CurrencyReward: req.body.Rewards.CurrencyReward,
            PremiumCurrencyReward: req.body.Rewards.PremiumCurrencyReward,
        } 
    });
    //Save To Database
    NewLevel
        .save()
        .then(level => res.status(200).json(level))
        .catch(err =>
            res.status(400).json({ user: 'An error has occured' })
        );
});

module.exports = router;