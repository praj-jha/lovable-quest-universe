
const path = require('path');
const fs = require('fs');
const util = require('util');
const crypto = require('crypto');
const mkdirp = require('mkdirp');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
mkdirp.sync(uploadsDir);

// Handle file upload
exports.uploadFile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded'
      });
    }
    
    const file = req.files.file;
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File is too large. Maximum size is 5MB'
      });
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only JPG, PNG and GIF files are allowed'
      });
    }
    
    // Generate unique filename
    const fileExt = path.extname(file.name);
    const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Move file to uploads directory
    await util.promisify(file.mv)(filePath);
    
    // Return file URL
    const fileUrl = `/uploads/${fileName}`;
    
    res.status(200).json({
      success: true,
      data: {
        fileName,
        filePath: fileUrl,
        fileType: file.mimetype,
        fileSize: file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message
    });
  }
};
