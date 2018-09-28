const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Song Schema
const SongSchema = new Schema({
  name: {
    type: String,
    maxlength: 255
  },
  artistID: {
    type: Number
  },
  duration: {
    type: Number
  },
  genreID: {
    type: Number
  },
  url: {
    type: String,
    maxlength: 255
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Song = mongoose.model('songs', SongSchema);
