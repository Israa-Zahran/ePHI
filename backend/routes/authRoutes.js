const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

const authRouter = express.Router();
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

module.exports = authRouter;