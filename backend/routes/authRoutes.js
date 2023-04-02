const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { auth } = require('../middleware/auth');

// const authRouter = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/userData',auth,authController.getUserByEmail);

module.exports = router;