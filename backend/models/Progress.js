
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  activitiesCompleted: {
    type: Number,
    default: 0
  },
  quizScores: {
    type: [Number],
    default: []
  },
  totalTimeSpent: {
    type: Number,  // in seconds
    default: 0
  },
  lastVisited: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to ensure a user can only have one progress record per zone
ProgressSchema.index({ userId: 1, zoneId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
