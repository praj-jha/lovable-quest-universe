
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const Analytics = require('../models/Analytics');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, subject, gradeLevel, questions } = req.body;
    
    // Create new quiz
    const quiz = new Quiz({
      title,
      description,
      creator: req.user.id,
      subject,
      gradeLevel,
      schoolId: req.user.schoolId,
      questions
    });
    
    await quiz.save();
    
    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
      error: error.message
    });
  }
};

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('creator', 'username')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get quizzes',
      error: error.message
    });
  }
};

// Get quizzes by school
exports.getQuizzesBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    
    const quizzes = await Quiz.find({ schoolId })
      .populate('creator', 'username')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get quizzes by school',
      error: error.message
    });
  }
};

// Get quizzes created by teacher
exports.getTeacherQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get teacher quizzes',
      error: error.message
    });
  }
};

// Get a single quiz
exports.getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    const quiz = await Quiz.findById(id)
      .populate('creator', 'username');
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // If user is student, don't send correct answers
    if (req.user.role === 'student') {
      const studentQuiz = quiz.toObject();
      studentQuiz.questions = studentQuiz.questions.map(q => ({
        ...q,
        correctAnswer: undefined
      }));
      
      return res.status(200).json({
        success: true,
        data: studentQuiz
      });
    }
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get quiz',
      error: error.message
    });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subject, gradeLevel, questions } = req.body;
    
    // Check if quiz exists
    let quiz = await Quiz.findById(id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user is the creator of the quiz
    if (quiz.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quiz'
      });
    }
    
    // Update quiz
    quiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, subject, gradeLevel, questions },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if quiz exists
    const quiz = await Quiz.findById(id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user is the creator of the quiz
    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quiz'
      });
    }
    
    // Delete quiz
    await Quiz.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
      error: error.message
    });
  }
};

// Start a quiz attempt
exports.startQuizAttempt = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if quiz exists
    const quiz = await Quiz.findById(id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user has an active attempt
    const existingAttempt = await QuizAttempt.findOne({
      studentId: req.user.id,
      quizId: id,
      status: 'in-progress'
    });
    
    if (existingAttempt) {
      return res.status(200).json({
        success: true,
        message: 'Quiz attempt already in progress',
        data: existingAttempt
      });
    }
    
    // Create new attempt
    const quizAttempt = new QuizAttempt({
      studentId: req.user.id,
      quizId: id,
      totalQuestions: quiz.questions.length,
      startedAt: Date.now()
    });
    
    await quizAttempt.save();
    
    // Return quiz without correct answers
    const studentQuiz = quiz.toObject();
    studentQuiz.questions = studentQuiz.questions.map(q => ({
      ...q,
      correctAnswer: undefined
    }));
    
    res.status(201).json({
      success: true,
      message: 'Quiz attempt started',
      data: {
        attempt: quizAttempt,
        quiz: studentQuiz
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start quiz attempt',
      error: error.message
    });
  }
};

// Submit a quiz answer
exports.submitAnswer = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { questionIndex, selectedAnswer, timeTaken } = req.body;
    
    // Check if attempt exists
    const attempt = await QuizAttempt.findById(attemptId);
    
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }
    
    // Check if user is the owner of the attempt
    if (attempt.studentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to submit answer for this attempt'
      });
    }
    
    // Check if attempt is still in progress
    if (attempt.status !== 'in-progress') {
      return res.status(400).json({
        success: false,
        message: `Quiz attempt is ${attempt.status}, cannot submit answer`
      });
    }
    
    // Get quiz
    const quiz = await Quiz.findById(attempt.quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if question exists
    if (questionIndex >= quiz.questions.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question index'
      });
    }
    
    // Check if answer is correct
    const question = quiz.questions[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Add response to attempt
    const response = {
      questionId: questionIndex,
      selectedAnswer,
      isCorrect,
      timeTaken
    };
    
    attempt.responses.push(response);
    
    // Update attempt stats
    if (isCorrect) {
      attempt.correctAnswers += 1;
    }
    
    attempt.timeSpent += timeTaken;
    
    // Check if all questions are answered
    if (attempt.responses.length === quiz.questions.length) {
      attempt.status = 'completed';
      attempt.completedAt = Date.now();
      attempt.score = Math.round((attempt.correctAnswers / quiz.questions.length) * 100);
      
      // Create analytics entry
      const analytics = new Analytics({
        userId: req.user.id,
        quizId: quiz._id,
        type: 'quiz',
        metrics: {
          accuracy: attempt.score / 100,
          timeSpent: attempt.timeSpent,
          score: attempt.score
        }
      });
      
      await analytics.save();
      
      // Update user XP
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { xp: Math.ceil(attempt.score / 10) * quiz.xpReward }
      });
    }
    
    await attempt.save();
    
    res.status(200).json({
      success: true,
      data: {
        isCorrect,
        attemptProgress: attempt.responses.length / quiz.questions.length,
        nextQuestion: attempt.responses.length < quiz.questions.length 
          ? attempt.responses.length 
          : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit answer',
      error: error.message
    });
  }
};

// Complete a quiz attempt
exports.completeQuizAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    
    // Check if attempt exists
    const attempt = await QuizAttempt.findById(attemptId);
    
    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }
    
    // Check if user is the owner of the attempt
    if (attempt.studentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this attempt'
      });
    }
    
    // Check if attempt is already completed
    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz attempt already completed'
      });
    }
    
    // Update attempt status
    attempt.status = 'completed';
    attempt.completedAt = Date.now();
    attempt.score = Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100);
    
    await attempt.save();
    
    // Get quiz for XP reward
    const quiz = await Quiz.findById(attempt.quizId);
    
    // Create analytics entry
    const analytics = new Analytics({
      userId: req.user.id,
      quizId: attempt.quizId,
      type: 'quiz',
      metrics: {
        accuracy: attempt.score / 100,
        timeSpent: attempt.timeSpent,
        score: attempt.score
      }
    });
    
    await analytics.save();
    
    // Update user XP
    if (quiz) {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { xp: Math.ceil(attempt.score / 10) * quiz.xpReward }
      });
    }
    
    res.status(200).json({
      success: true,
      data: attempt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to complete quiz attempt',
      error: error.message
    });
  }
};

// Get quiz attempts for a student
exports.getStudentAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ studentId: req.user.id })
      .populate('quizId', 'title subject')
      .sort({ startedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get student attempts',
      error: error.message
    });
  }
};

// Get quiz attempts for a quiz
exports.getQuizAttempts = async (req, res) => {
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
    
    // Check if user is the creator of the quiz
    if (quiz.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view attempts for this quiz'
      });
    }
    
    const attempts = await QuizAttempt.find({ quizId })
      .populate('studentId', 'username')
      .sort({ startedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: attempts.length,
      data: attempts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get quiz attempts',
      error: error.message
    });
  }
};
