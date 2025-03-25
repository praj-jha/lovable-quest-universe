
const Analytics = require('../models/Analytics');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const User = require('../models/User');

// Get user analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    
    // Check if requesting other user's analytics
    if (userId !== req.user.id && req.user.role !== 'educator' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this user\'s analytics'
      });
    }
    
    // Get quiz analytics
    const quizAnalytics = await Analytics.find({
      userId,
      type: 'quiz'
    }).populate('quizId', 'title subject');
    
    // Get quiz attempts
    const quizAttempts = await QuizAttempt.find({
      studentId: userId,
      status: 'completed'
    })
      .populate('quizId', 'title subject')
      .sort({ completedAt: -1 });
    
    // Calculate aggregate stats
    const totalQuizzes = quizAttempts.length;
    const averageScore = totalQuizzes > 0
      ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalQuizzes
      : 0;
    const averageTimeSpent = totalQuizzes > 0
      ? quizAttempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / totalQuizzes
      : 0;
    
    // Get subject performance
    const subjectPerformance = {};
    quizAttempts.forEach(attempt => {
      if (attempt.quizId && attempt.quizId.subject) {
        const subject = attempt.quizId.subject;
        if (!subjectPerformance[subject]) {
          subjectPerformance[subject] = {
            totalScore: 0,
            count: 0,
            averageScore: 0
          };
        }
        subjectPerformance[subject].totalScore += attempt.score;
        subjectPerformance[subject].count += 1;
        subjectPerformance[subject].averageScore = 
          subjectPerformance[subject].totalScore / subjectPerformance[subject].count;
      }
    });
    
    // Get user data
    const user = await User.findById(userId).select('username xp level');
    
    res.status(200).json({
      success: true,
      data: {
        user,
        summary: {
          totalQuizzes,
          averageScore,
          averageTimeSpent,
          subjectPerformance
        },
        recentAttempts: quizAttempts.slice(0, 5),
        quizAnalytics
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user analytics',
      error: error.message
    });
  }
};

// Get quiz analytics
exports.getQuizAnalytics = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user is authorized to view analytics
    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view quiz analytics'
      });
    }
    
    // Get all attempts for this quiz
    const attempts = await QuizAttempt.find({
      quizId,
      status: 'completed'
    })
      .populate('studentId', 'username')
      .sort({ score: -1 });
    
    // Calculate aggregate stats
    const totalAttempts = attempts.length;
    const averageScore = totalAttempts > 0
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts
      : 0;
    const averageTimeSpent = totalAttempts > 0
      ? attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0) / totalAttempts
      : 0;
    const highestScore = totalAttempts > 0
      ? Math.max(...attempts.map(attempt => attempt.score))
      : 0;
    const lowestScore = totalAttempts > 0
      ? Math.min(...attempts.map(attempt => attempt.score))
      : 0;
    
    // Question statistics
    const questionStats = [];
    
    if (totalAttempts > 0) {
      // Initialize stats for each question
      for (let i = 0; i < quiz.questions.length; i++) {
        questionStats.push({
          questionIndex: i,
          question: quiz.questions[i].question,
          correctCount: 0,
          incorrectCount: 0,
          averageTime: 0,
          totalTime: 0
        });
      }
      
      // Aggregate stats for each question
      attempts.forEach(attempt => {
        attempt.responses.forEach(response => {
          if (response.questionId < questionStats.length) {
            const stat = questionStats[response.questionId];
            if (response.isCorrect) {
              stat.correctCount++;
            } else {
              stat.incorrectCount++;
            }
            stat.totalTime += response.timeTaken || 0;
          }
        });
      });
      
      // Calculate averages
      questionStats.forEach(stat => {
        const totalResponses = stat.correctCount + stat.incorrectCount;
        stat.averageTime = totalResponses > 0 ? stat.totalTime / totalResponses : 0;
        stat.correctPercentage = totalResponses > 0 ? (stat.correctCount / totalResponses) * 100 : 0;
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        quiz: {
          title: quiz.title,
          subject: quiz.subject,
          gradeLevel: quiz.gradeLevel
        },
        summary: {
          totalAttempts,
          averageScore,
          averageTimeSpent,
          highestScore,
          lowestScore,
          passingRate: totalAttempts > 0
            ? (attempts.filter(a => a.score >= quiz.passingScore).length / totalAttempts) * 100
            : 0
        },
        studentPerformance: attempts.map(attempt => ({
          student: attempt.studentId,
          score: attempt.score,
          timeSpent: attempt.timeSpent,
          completedAt: attempt.completedAt
        })),
        questionStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get quiz analytics',
      error: error.message
    });
  }
};

// Get class analytics for teacher
exports.getClassAnalytics = async (req, res) => {
  try {
    // Get all quizzes created by teacher
    const quizzes = await Quiz.find({ creator: req.user.id });
    
    if (quizzes.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No quizzes found for this teacher',
        data: {
          quizzes: [],
          summary: {
            totalQuizzes: 0,
            totalAttempts: 0,
            averageClassScore: 0
          }
        }
      });
    }
    
    // Get all quiz attempts
    const quizIds = quizzes.map(quiz => quiz._id);
    const attempts = await QuizAttempt.find({
      quizId: { $in: quizIds },
      status: 'completed'
    })
      .populate('studentId', 'username')
      .populate('quizId', 'title subject');
    
    // Calculate aggregate stats
    const totalQuizzes = quizzes.length;
    const totalAttempts = attempts.length;
    const averageClassScore = totalAttempts > 0
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts
      : 0;
    
    // Get student performance
    const studentPerformance = {};
    attempts.forEach(attempt => {
      if (attempt.studentId && attempt.studentId._id) {
        const studentId = attempt.studentId._id.toString();
        if (!studentPerformance[studentId]) {
          studentPerformance[studentId] = {
            student: attempt.studentId,
            totalScore: 0,
            count: 0,
            averageScore: 0,
            quizzes: []
          };
        }
        studentPerformance[studentId].totalScore += attempt.score;
        studentPerformance[studentId].count += 1;
        studentPerformance[studentId].averageScore = 
          studentPerformance[studentId].totalScore / studentPerformance[studentId].count;
        studentPerformance[studentId].quizzes.push({
          quiz: attempt.quizId,
          score: attempt.score,
          completedAt: attempt.completedAt
        });
      }
    });
    
    // Get quiz performance
    const quizPerformance = {};
    attempts.forEach(attempt => {
      if (attempt.quizId && attempt.quizId._id) {
        const quizId = attempt.quizId._id.toString();
        if (!quizPerformance[quizId]) {
          quizPerformance[quizId] = {
            quiz: attempt.quizId,
            totalScore: 0,
            count: 0,
            averageScore: 0,
            highestScore: 0,
            lowestScore: 100
          };
        }
        quizPerformance[quizId].totalScore += attempt.score;
        quizPerformance[quizId].count += 1;
        quizPerformance[quizId].averageScore = 
          quizPerformance[quizId].totalScore / quizPerformance[quizId].count;
        quizPerformance[quizId].highestScore = 
          Math.max(quizPerformance[quizId].highestScore, attempt.score);
        quizPerformance[quizId].lowestScore = 
          Math.min(quizPerformance[quizId].lowestScore, attempt.score);
      }
    });
    
    res.status(200).json({
      success: true,
      data: {
        quizzes: quizzes.map(quiz => ({
          _id: quiz._id,
          title: quiz.title,
          subject: quiz.subject,
          gradeLevel: quiz.gradeLevel,
          createdAt: quiz.createdAt
        })),
        summary: {
          totalQuizzes,
          totalAttempts,
          averageClassScore
        },
        studentPerformance: Object.values(studentPerformance),
        quizPerformance: Object.values(quizPerformance)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get class analytics',
      error: error.message
    });
  }
};

// Get challenge analytics
exports.getChallengeAnalytics = async (req, res) => {
  try {
    const { challengeId } = req.params;
    
    // Check if challenge exists
    const challenge = await Challenge.findById(challengeId);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Check if user is authorized to view analytics
    if (challenge.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view challenge analytics'
      });
    }
    
    // Get all submissions for this challenge
    const submissions = await Submission.find({ challengeId })
      .populate('familyId', 'name')
      .sort({ votes: -1 });
    
    // Calculate aggregate stats
    const totalSubmissions = submissions.length;
    const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
    const totalVotes = submissions.reduce((sum, s) => sum + s.votes, 0);
    
    res.status(200).json({
      success: true,
      data: {
        challenge: {
          title: challenge.title,
          category: challenge.category,
          startDate: challenge.startDate,
          endDate: challenge.endDate
        },
        summary: {
          totalSubmissions,
          approvedSubmissions,
          totalVotes,
          participationRate: totalSubmissions / (await Submission.countDocuments())
        },
        submissions: submissions.map(s => ({
          family: s.familyId,
          votes: s.votes,
          status: s.status,
          submittedAt: s.submittedAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get challenge analytics',
      error: error.message
    });
  }
};
