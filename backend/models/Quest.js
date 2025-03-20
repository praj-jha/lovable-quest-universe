
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String]
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed
  },
  type: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'text', 'file_upload'],
    default: 'multiple_choice'
  },
  points: {
    type: Number,
    default: 10
  }
});

const QuestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['family', 'individual', 'classroom', 'challenge'],
    required: true
  },
  subject: {
    type: String,
    enum: ['math', 'science', 'reading', 'writing', 'history', 'geography', 'art', 'music', 'coding', 'mixed'],
    required: true
  },
  ageRange: {
    min: Number,
    max: Number
  },
  questions: [QuestionSchema],
  expectedDuration: {
    type: Number,  // in minutes
    default: 30
  },
  xpReward: {
    type: Number,
    default: 50
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
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

module.exports = mongoose.model('Quest', QuestSchema);
