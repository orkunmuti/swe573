const express = require('express');
const authRouter = express.Router();
const { signUp, signIn } = require('../controllers/authController');

// SIGN UP
authRouter.route('/signup').post(signUp);

// SIGN IN
authRouter.route('/signin').post(signIn);

module.exports = authRouter;
