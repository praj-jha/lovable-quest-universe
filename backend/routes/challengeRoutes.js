
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const challengeController = require('../controllers/challengeController');

// Public routes
router.get('/', challengeController.getChallenges);
router.get('/active', challengeController.getActiveChallenges);
router.get('/:id', challengeController.getChallenge);
router.get('/:id/submissions', challengeController.getChallengeSubmissions);
router.get('/leaderboard', challengeController.getChallengeLeaderboard);

// Protected routes
router.post('/', authenticateUser, authorizeRole(['admin']), challengeController.createChallenge);
router.put('/:id', authenticateUser, authorizeRole(['admin']), challengeController.updateChallenge);
router.delete('/:id', authenticateUser, authorizeRole(['admin']), challengeController.deleteChallenge);
router.post('/:id/submit', authenticateUser, challengeController.submitChallenge);
router.post('/submissions/:id/vote', authenticateUser, challengeController.voteSubmission);

module.exports = router;
