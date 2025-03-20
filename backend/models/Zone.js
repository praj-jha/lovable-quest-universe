
const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  color: {
    type: String
  },
  level: {
    type: Number,
    default: 1
  },
  position: {
    x: Number,
    y: Number
  },
  subject: {
    type: String,
    enum: ['math', 'science', 'reading', 'writing', 'history', 'geography', 'art', 'music', 'coding'],
    required: true
  },
  ageRange: {
    min: Number,
    max: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Zone', ZoneSchema);
