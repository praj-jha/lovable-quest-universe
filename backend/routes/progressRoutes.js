
const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authenticateUser } = require('../middleware/auth');

// Get user progress (requires authentication)
router.get('/', authenticateUser, progressController.getUserProgress);

// Update user progress (requires authentication)
router.post('/', authenticateUser, progressController.updateProgress);

// Get leaderboard
router.get('/leaderboard', progressController.getLeaderboard);

module.exports = router;
