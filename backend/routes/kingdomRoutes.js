
const express = require('express');
const router = express.Router();
const kingdomController = require('../controllers/kingdomController');
const { authenticateUser } = require('../middleware/auth');

// Get all kingdom zones
router.get('/zones', kingdomController.getAllZones);

// Get a specific zone
router.get('/zones/:id', kingdomController.getZoneById);

// Get activities for a zone
router.get('/zones/:id/activities', kingdomController.getZoneActivities);

// Get quizzes for a zone
router.get('/zones/:id/quizzes', kingdomController.getZoneQuizzes);

// Track user progress in a zone (requires authentication)
router.post('/zones/:id/progress', authenticateUser, kingdomController.trackZoneProgress);

module.exports = router;
