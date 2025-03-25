
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
    required: true
  },
  images: [{
    type: String // URLs to images
  }],
  description: {
    type: String
  },
  votes: {
    type: Number,
    default: 0
  },
  voters: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ipAddress: String,
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to ensure a family can only submit once per challenge
SubmissionSchema.index({ challengeId: 1, familyId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
