
const mongoose = require('mongoose');

const UserQuestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'failed'],
    default: 'not-started'
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  score: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,  // in seconds
    default: 0
  }
});

// Create compound index to ensure a user can only have one record per quest
UserQuestSchema.index({ userId: 1, questId: 1 }, { unique: true });

module.exports = mongoose.model('UserQuest', UserQuestSchema);
