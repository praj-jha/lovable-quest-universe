
const Zone = require('../models/Zone');
const Activity = require('../models/Activity');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

exports.getAllZones = async (req, res) => {
  try {
    const zones = await Zone.find({ isActive: true }).sort({ level: 1 });
    
    // If user is authenticated, get their progress
    let userProgress = [];
    if (req.user && req.user.id) {
      userProgress = await Progress.find({ userId: req.user.id });
    }
    
    // Map zones with progress if available
    const zonesWithProgress = zones.map(zone => {
      const progress = userProgress.find(p => p.zoneId.toString() === zone._id.toString());
      return {
        ...zone.toObject(),
        progress: progress ? {
          activitiesCompleted: progress.activitiesCompleted,
          quizScores: progress.quizScores,
          lastVisited: progress.lastVisited
        } : null
      };
    });
    
    res.json({
      success: true,
      data: zonesWithProgress
    });
  } catch (error) {
    console.error('Get all zones error:', error);
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
    
    // Get user progress for this zone if authenticated
    let progress = null;
    if (req.user && req.user.id) {
      progress = await Progress.findOne({ 
        userId: req.user.id,
        zoneId: zone._id
      });
    }
    
    res.json({
      success: true,
      data: {
        ...zone.toObject(),
        progress: progress ? {
          activitiesCompleted: progress.activitiesCompleted,
          quizScores: progress.quizScores,
          totalTimeSpent: progress.totalTimeSpent,
          lastVisited: progress.lastVisited
        } : null
      }
    });
  } catch (error) {
    console.error('Get zone by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching zone',
      error: error.message
    });
  }
};

exports.getZoneActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ 
      zoneId: req.params.id,
      isActive: true
    }).sort({ difficulty: 1 });
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Get zone activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
};

exports.getZoneQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ 
      zoneId: req.params.id,
      isActive: true
    }).sort({ difficulty: 1 });
    
    res.json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    console.error('Get zone quizzes error:', error);
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

    // Get the user for XP updates
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create or update progress
    let progress = await Progress.findOne({ userId, zoneId });
    
    if (progress) {
      // Update existing progress
      if (activityCompleted) {
        progress.activitiesCompleted += 1;
        // Add XP for completing activity
        await user.addXP(10);
      }
      
      if (quizScore !== undefined) {
        progress.quizScores.push(quizScore);
        // Add XP based on quiz score
        const xpGained = Math.round(quizScore / 10);
        await user.addXP(xpGained);
      }
      
      if (timeSpent) {
        progress.totalTimeSpent += timeSpent;
        // Add XP for time spent (1 XP per minute)
        const minutesSpent = Math.round(timeSpent / 60);
        if (minutesSpent > 0) {
          await user.addXP(minutesSpent);
        }
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
      
      // Add initial XP
      if (activityCompleted) {
        await user.addXP(10);
      }
      
      if (quizScore !== undefined) {
        const xpGained = Math.round(quizScore / 10);
        await user.addXP(xpGained);
      }
    }

    // Check for achievement unlocks
    const achievements = await checkAchievements(userId);

    res.json({
      success: true,
      data: {
        progress,
        xp: user.xp,
        level: user.level,
        newAchievements: achievements
      }
    });
  } catch (error) {
    console.error('Track zone progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking progress',
      error: error.message
    });
  }
};

// Helper function to check for achievements
async function checkAchievements(userId) {
  try {
    const user = await User.findById(userId);
    const userProgress = await Progress.find({ userId });
    
    // Get all achievements user doesn't have yet
    const allAchievements = await Achievement.find({
      _id: { $nin: user.achievements },
      isActive: true
    });
    
    const newAchievements = [];
    
    // Check each achievement type
    for (const achievement of allAchievements) {
      let unlocked = false;
      
      switch (achievement.type) {
        case 'activity_completion':
          // Total activities completed across all zones
          const totalActivities = userProgress.reduce((sum, p) => sum + p.activitiesCompleted, 0);
          unlocked = totalActivities >= achievement.threshold;
          break;
          
        case 'zone_completion':
          // Count zones where all activities are completed
          const completedZones = userProgress.filter(p => p.activitiesCompleted >= 3).length;
          unlocked = completedZones >= achievement.threshold;
          break;
          
        case 'login_streak':
          // This would require additional tracking not implemented yet
          break;
          
        case 'high_score':
          // Count perfect scores on quizzes
          const perfectScores = userProgress.reduce((count, p) => {
            return count + p.quizScores.filter(score => score >= 90).length;
          }, 0);
          unlocked = perfectScores >= achievement.threshold;
          break;
          
        case 'time_spent':
          // Total time spent across all zones (in seconds)
          const totalTime = userProgress.reduce((sum, p) => sum + p.totalTimeSpent, 0);
          unlocked = totalTime >= achievement.threshold;
          break;
      }
      
      if (unlocked) {
        // Add achievement to user
        user.achievements.push(achievement._id);
        // Award XP
        user.xp += achievement.xpReward;
        newAchievements.push(achievement);
      }
    }
    
    if (newAchievements.length > 0) {
      await user.save();
    }
    
    return newAchievements;
  } catch (error) {
    console.error('Achievement check error:', error);
    return [];
  }
}
