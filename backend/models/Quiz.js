
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: Number,  // Index of the correct option
    required: true
  },
  points: {
    type: Number,
    default: 10
  }
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  zoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    validate: [arr => arr.length > 0, 'Quiz must have at least one question']
  },
  timeLimit: {
    type: Number,  // in minutes
    default: 10
  },
  passingScore: {
    type: Number,
    default: 60  // percentage
  },
  xpReward: {
    type: Number,
    default: 20
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

module.exports = mongoose.model('Quiz', QuizSchema);
