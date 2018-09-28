const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Game Schema
const GameSchema = new Schema({
  authorID: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  songID: {
    type: Schema.Types.ObjectId,
    ref: 'songs'
  },
  difficulty: {
    type: Number,
    required: true
  },
  tiles: [
    { tileID: Number, tile_time: Number, tile_line: Number, tile_speed: Number }
  ],
  reward: {
    currency: { type: Number, required: true },
    experience: { type: String, required: true }
  },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});

module.exports = Game = mongoose.model('games', GameSchema);
