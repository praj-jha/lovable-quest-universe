
const Quest = require('../models/Quest');
const UserQuest = require('../models/UserQuest');
const Achievement = require('../models/Achievement');
const User = require('../models/User');

exports.getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json({
      success: true,
      data: quests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quests',
      error: error.message
    });
  }
};

exports.getQuestsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const quests = await Quest.find({ category });
    res.json({
      success: true,
      data: quests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quests by category',
      error: error.message
    });
  }
};

exports.getQuestById = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found'
      });
    }
    res.json({
      success: true,
      data: quest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quest',
      error: error.message
    });
  }
};

exports.startQuest = async (req, res) => {
  try {
    const questId = req.params.id;
    const userId = req.user.id;

    // Check if quest exists
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found'
      });
    }

    // Check if user has already started this quest
    let userQuest = await UserQuest.findOne({ userId, questId });
    
    if (userQuest) {
      // Update if already exists
      userQuest.startedAt = Date.now();
      userQuest.status = 'in-progress';
      await userQuest.save();
    } else {
      // Create new user quest entry
      userQuest = new UserQuest({
        userId,
        questId,
        status: 'in-progress',
        startedAt: Date.now()
      });
      await userQuest.save();
    }

    res.json({
      success: true,
      data: userQuest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting quest',
      error: error.message
    });
  }
};

exports.submitQuest = async (req, res) => {
  try {
    const questId = req.params.id;
    const userId = req.user.id;
    const { answers, timeSpent } = req.body;

    // Check if quest exists
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found'
      });
    }

    // Calculate score based on answers
    let score = 0;
    let correctAnswers = 0;
    
    if (quest.questions && quest.questions.length > 0 && answers) {
      quest.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          score += question.points || 10;
          correctAnswers++;
        }
      });
    }

    // Update user quest
    const userQuest = await UserQuest.findOneAndUpdate(
      { userId, questId },
      {
        status: 'completed',
        completedAt: Date.now(),
        score,
        correctAnswers,
        timeSpent: timeSpent || 0
      },
      { new: true, upsert: true }
    );

    // Check if any achievements unlocked
    const user = await User.findById(userId);
    const completedQuests = await UserQuest.countDocuments({ 
      userId, 
      status: 'completed' 
    });

    // Check for quest completion achievements
    const questAchievements = await Achievement.find({ 
      type: 'quest_completion',
      threshold: { $lte: completedQuests }
    });

    // Add new achievements to user
    if (questAchievements.length > 0) {
      for (const achievement of questAchievements) {
        if (!user.achievements.includes(achievement._id)) {
          user.achievements.push(achievement._id);
        }
      }
      await user.save();
    }

    res.json({
      success: true,
      data: {
        userQuest,
        newAchievements: questAchievements
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting quest',
      error: error.message
    });
  }
};
