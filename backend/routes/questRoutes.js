
const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');
const { authenticateUser } = require('../middleware/auth');

// Get all quests
router.get('/', questController.getAllQuests);

// Get quests by category
router.get('/category/:category', questController.getQuestsByCategory);

// Get a specific quest
router.get('/:id', questController.getQuestById);

// Start a quest (requires authentication)
router.post('/:id/start', authenticateUser, questController.startQuest);

// Submit a quest (requires authentication)
router.post('/:id/submit', authenticateUser, questController.submitQuest);

module.exports = router;
