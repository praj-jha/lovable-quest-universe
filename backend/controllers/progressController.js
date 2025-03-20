
const Progress = require('../models/Progress');
const User = require('../models/User');

exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.find({ userId }).populate('zoneId');
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { zoneId, activityCompleted, quizScore, timeSpent } = req.body;

    // Find or create progress document
    let progress = await Progress.findOne({ userId, zoneId });
    
    if (progress) {
      // Update existing progress
      if (activityCompleted) {
        progress.activitiesCompleted += 1;
      }
      
      if (quizScore !== undefined) {
        progress.quizScores.push(quizScore);
      }
      
      if (timeSpent) {
        progress.totalTimeSpent += timeSpent;
      }
      
      progress.lastVisited = Date.now();
      await progress.save();
    } else {
      // Create new progress
      progress = new Progress({
        userId,
        zoneId,
        activitiesCompleted: activityCompleted ? 1 : 0,
        quizScores: quizScore !== undefined ? [quizScore] : [],
        totalTimeSpent: timeSpent || 0,
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
      message: 'Error updating progress',
      error: error.message
    });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    // Aggregate user progress across all zones
    const leaderboard = await Progress.aggregate([
      { $group: {
          _id: '$userId',
          totalActivities: { $sum: '$activitiesCompleted' },
          averageQuizScore: { $avg: { $avg: '$quizScores' } },
          totalTimeSpent: { $sum: '$totalTimeSpent' }
        }
      },
      { $sort: { totalActivities: -1 } },
      { $limit: 10 }
    ]);

    // Get user details for the leaderboard
    const populatedLeaderboard = await User.populate(leaderboard, {
      path: '_id',
      select: 'username avatar'
    });

    const formattedLeaderboard = populatedLeaderboard.map(entry => ({
      user: entry._id,
      totalActivities: entry.totalActivities,
      averageQuizScore: parseFloat(entry.averageQuizScore.toFixed(2)),
      totalTimeSpent: entry.totalTimeSpent
    }));

    res.json({
      success: true,
      data: formattedLeaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};
