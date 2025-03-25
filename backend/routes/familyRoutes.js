
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const familyController = require('../controllers/familyController');

// Public routes
router.get('/', familyController.getFamilies);
router.get('/leaderboard', familyController.getFamilyLeaderboard);
router.get('/:id', familyController.getFamily);

// Protected routes
router.get('/user/me', authenticateUser, familyController.getUserFamily);
router.post('/', authenticateUser, familyController.createFamily);
router.put('/:id', authenticateUser, familyController.updateFamily);
router.post('/:id/members', authenticateUser, familyController.addFamilyMember);
router.delete('/:id/members/:memberId', authenticateUser, familyController.removeFamilyMember);
router.put('/:id/admin', authenticateUser, familyController.transferAdmin);

module.exports = router;
