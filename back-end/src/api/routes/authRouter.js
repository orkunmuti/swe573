const express = require('express');
const authRouter = express.Router();
const {
  signUp,
  signIn,
  updateUser,
  getUser,
} = require('../controllers/authController');
const { authenticateToken } = require('../utils/authenticateToken');

// SIGN UP
authRouter.route('/signup').post(signUp);

// SIGN IN
authRouter.route('/signin').post(signIn);

// GET USER DETAILS
authRouter.get('/users/:id', authenticateToken, getUser);

// UPDATE USER
authRouter.put('/users/:id', authenticateToken, updateUser);

module.exports = authRouter;
