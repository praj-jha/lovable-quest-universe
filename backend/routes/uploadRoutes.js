
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

// All routes are protected
router.post('/', authenticateUser, uploadController.uploadFile);

module.exports = router;
