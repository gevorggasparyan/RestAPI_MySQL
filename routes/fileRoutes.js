const express = require('express');
const {
    uploadFile, listFiles, getFileInfo, downloadFile,
    updateFile, deleteFile, uploadMiddleware
} = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware, uploadMiddleware, uploadFile);
router.get('/list', authMiddleware, listFiles);
router.get('/:id', authMiddleware, getFileInfo);
router.get('/download/:id', authMiddleware, downloadFile);
router.put('/update/:id', authMiddleware, uploadMiddleware, updateFile);
router.delete('/delete/:id', authMiddleware, deleteFile);

module.exports = router;
