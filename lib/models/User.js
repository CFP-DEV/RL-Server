const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  currency: {
    type: Number,
    default: 0
  },
  premiumcurrency: {
    type: Number,
    default: 0
  },
  experience: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 0
  },
  registration_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['basic', 'moderator', 'administrator'],
    default: 'basic'
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'idle'],
    default: 'offline'
  },
  issuspended: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('users', UserSchema);