
const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const quizController = require('../controllers/quizController');

// Public routes
router.get('/', quizController.getQuizzes);

// Protected routes
router.post('/', authenticateUser, authorizeRole(['educator', 'admin']), quizController.createQuiz);
router.get('/school/:schoolId', authenticateUser, quizController.getQuizzesBySchool);
router.get('/teacher', authenticateUser, authorizeRole(['educator']), quizController.getTeacherQuizzes);
router.get('/:id', authenticateUser, quizController.getQuiz);
router.put('/:id', authenticateUser, authorizeRole(['educator', 'admin']), quizController.updateQuiz);
router.delete('/:id', authenticateUser, authorizeRole(['educator', 'admin']), quizController.deleteQuiz);

// Quiz attempts
router.post('/:id/start', authenticateUser, authorizeRole(['student']), quizController.startQuizAttempt);
router.post('/attempts/:attemptId/answer', authenticateUser, authorizeRole(['student']), quizController.submitAnswer);
router.post('/attempts/:attemptId/complete', authenticateUser, authorizeRole(['student']), quizController.completeQuizAttempt);
router.get('/attempts/student', authenticateUser, authorizeRole(['student']), quizController.getStudentAttempts);
router.get('/:quizId/attempts', authenticateUser, authorizeRole(['educator', 'admin']), quizController.getQuizAttempts);

module.exports = router;
