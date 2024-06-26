const express = require('express');
const { signup, signin, refreshToken, info, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/new_token', refreshToken);
router.get('/info', authMiddleware, info);
router.get('/logout', authMiddleware, logout);

module.exports = router;
