
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const Family = require('../models/Family');
const Analytics = require('../models/Analytics');
const mongoose = require('mongoose');

// Create a new challenge
exports.createChallenge = async (req, res) => {
  try {
    const { title, description, category, difficulty, startDate, endDate, submissionGuidelines, pointsReward } = req.body;
    
    // Create new challenge
    const challenge = new Challenge({
      title,
      description,
      category,
      difficulty,
      startDate,
      endDate,
      submissionGuidelines,
      pointsReward,
      createdBy: req.user.id
    });
    
    await challenge.save();
    
    res.status(201).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create challenge',
      error: error.message
    });
  }
};

// Get all challenges
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate('createdBy', 'username')
      .sort({ startDate: -1 });
    
    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get challenges',
      error: error.message
    });
  }
};

// Get active challenges
exports.getActiveChallenges = async (req, res) => {
  try {
    const now = new Date();
    
    const challenges = await Challenge.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
      isActive: true
    })
      .populate('createdBy', 'username')
      .sort({ endDate: 1 });
    
    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get active challenges',
      error: error.message
    });
  }
};

// Get a single challenge
exports.getChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    
    const challenge = await Challenge.findById(id)
      .populate('createdBy', 'username');
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get challenge',
      error: error.message
    });
  }
};

// Update a challenge
exports.updateChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Check if challenge exists
    let challenge = await Challenge.findById(id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Check if user is authorized to update
    if (challenge.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this challenge'
      });
    }
    
    // Update challenge
    challenge = await Challenge.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update challenge',
      error: error.message
    });
  }
};

// Delete a challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if challenge exists
    const challenge = await Challenge.findById(id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Check if user is authorized to delete
    if (challenge.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this challenge'
      });
    }
    
    // Delete challenge
    await Challenge.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Challenge deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete challenge',
      error: error.message
    });
  }
};

// Submit to a challenge
exports.submitChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, images } = req.body;
    
    // Check if challenge exists
    const challenge = await Challenge.findById(id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Check if challenge is still active
    const now = new Date();
    if (now < challenge.startDate || now > challenge.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Challenge is not active'
      });
    }
    
    // Check if user has a family
    if (!req.user.familyId) {
      return res.status(400).json({
        success: false,
        message: 'You must be part of a family to submit to challenges'
      });
    }
    
    // Check if family already submitted to this challenge
    const existingSubmission = await Submission.findOne({
      challengeId: id,
      familyId: req.user.familyId
    });
    
    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Your family has already submitted to this challenge'
      });
    }
    
    // Create submission
    const submission = new Submission({
      challengeId: id,
      familyId: req.user.familyId,
      description,
      images
    });
    
    await submission.save();
    
    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit to challenge',
      error: error.message
    });
  }
};

// Get submissions for a challenge
exports.getChallengeSubmissions = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if challenge exists
    const challenge = await Challenge.findById(id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    const submissions = await Submission.find({ challengeId: id, status: 'approved' })
      .populate('familyId', 'name')
      .sort({ votes: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get challenge submissions',
      error: error.message
    });
  }
};

// Vote for a submission
exports.voteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const ipAddress = req.ip || req.connection.remoteAddress;
    
    // Check if submission exists
    const submission = await Submission.findById(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    // Check if submission is approved
    if (submission.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot vote for a submission that is not approved'
      });
    }
    
    // Check if user already voted
    const alreadyVoted = submission.voters.some(
      voter => (voter.userId && voter.userId.toString() === req.user.id) || 
               (voter.ipAddress === ipAddress)
    );
    
    if (alreadyVoted) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted for this submission'
      });
    }
    
    // Check if user is voting for their own family's submission
    if (req.user.familyId && submission.familyId.toString() === req.user.familyId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You cannot vote for your own family\'s submission'
      });
    }
    
    // Add vote
    submission.votes += 1;
    submission.voters.push({
      userId: req.user.id,
      ipAddress,
      votedAt: Date.now()
    });
    
    await submission.save();
    
    res.status(200).json({
      success: true,
      message: 'Vote registered successfully',
      data: {
        votes: submission.votes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to vote for submission',
      error: error.message
    });
  }
};

// Get leaderboard for challenges
exports.getChallengeLeaderboard = async (req, res) => {
  try {
    // Get families with their submissions
    const families = await Family.aggregate([
      {
        $lookup: {
          from: 'submissions',
          localField: '_id',
          foreignField: 'familyId',
          as: 'submissions'
        }
      },
      {
        $project: {
          name: 1,
          points: 1,
          level: 1,
          submissionCount: { $size: '$submissions' },
          totalVotes: {
            $sum: '$submissions.votes'
          }
        }
      },
      {
        $sort: {
          points: -1,
          totalVotes: -1
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      count: families.length,
      data: families
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get challenge leaderboard',
      error: error.message
    });
  }
};
