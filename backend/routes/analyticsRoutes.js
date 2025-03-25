
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

// All routes are protected
router.get('/user', authenticateUser, analyticsController.getUserAnalytics);
router.get('/user/:userId', authenticateUser, authorizeRole(['educator', 'admin']), analyticsController.getUserAnalytics);
router.get('/quiz/:quizId', authenticateUser, authorizeRole(['educator', 'admin']), analyticsController.getQuizAnalytics);
router.get('/class', authenticateUser, authorizeRole(['educator', 'admin']), analyticsController.getClassAnalytics);
router.get('/challenge/:challengeId', authenticateUser, authorizeRole(['admin']), analyticsController.getChallengeAnalytics);

module.exports = router;
