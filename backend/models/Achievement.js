
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  type: {
    type: String,
    enum: ['quest_completion', 'zone_completion', 'activity_completion', 'login_streak', 'high_score', 'time_spent'],
    required: true
  },
  threshold: {
    type: Number,
    required: true  // The number required to unlock (e.g., 5 quests completed)
  },
  xpReward: {
    type: Number,
    default: 50
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
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

module.exports = mongoose.model('Achievement', AchievementSchema);
