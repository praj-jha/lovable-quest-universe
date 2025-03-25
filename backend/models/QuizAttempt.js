
const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  questionId: {
    type: Number, // Index of the question in the quiz
    required: true
  },
  selectedAnswer: {
    type: Number, // Index of the selected option
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeTaken: {
    type: Number, // in seconds
    default: 0
  }
});

const QuizAttemptSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  responses: [ResponseSchema],
  score: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'expired'],
    default: 'in-progress'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  }
});

// Create compound index to ensure uniqueness of attempts
QuizAttemptSchema.index({ studentId: 1, quizId: 1 }, { unique: false });

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
