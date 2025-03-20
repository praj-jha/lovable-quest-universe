
const Zone = require('../models/Zone');
const Activity = require('../models/Activity');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json({
      success: true,
      data: zones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching zones',
      error: error.message
    });
  }
};

exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({
        success: false,
        message: 'Zone not found'
      });
    }
    res.json({
      success: true,
      data: zone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching zone',
      error: error.message
    });
  }
};

exports.getZoneActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ zoneId: req.params.id });
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
};

exports.getZoneQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ zoneId: req.params.id });
    res.json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes',
      error: error.message
    });
  }
};

exports.trackZoneProgress = async (req, res) => {
  try {
    const { activityCompleted, quizScore, timeSpent } = req.body;
    const userId = req.user.id;
    const zoneId = req.params.id;

    // Create or update progress
    let progress = await Progress.findOne({ userId, zoneId });
    
    if (progress) {
      // Update existing progress
      progress.activitiesCompleted = progress.activitiesCompleted + (activityCompleted ? 1 : 0);
      progress.quizScores.push(quizScore);
      progress.totalTimeSpent += timeSpent;
      progress.lastVisited = Date.now();
      await progress.save();
    } else {
      // Create new progress
      progress = new Progress({
        userId,
        zoneId,
        activitiesCompleted: activityCompleted ? 1 : 0,
        quizScores: quizScore ? [quizScore] : [],
        totalTimeSpent: timeSpent,
        lastVisited: Date.now()
      });
      await progress.save();
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking progress',
      error: error.message
    });
  }
};
