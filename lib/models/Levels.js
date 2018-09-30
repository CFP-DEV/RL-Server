const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Levels Schema
const LevelsSchema = new Schema({
  Level: {
      type: Number, 
      required: true
  },
  MaxExperience: {
    type: Number,
    required: true
  },
  Rewards: {
    CurrencyReward: {
      type: Number,
      required: true
    },
    PremiumCurrencyReward: {
      type: Number,
      required: true
    }
  }
});

module.exports = Levels = mongoose.model('level', LevelsSchema);