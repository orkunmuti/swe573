const express = require('express');
const api = express();
const authRouter = require('./routes/authRouter');
const recipeRouter = require('./routes/recipeRouter');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
api.use(bodyParser.json({ limit: '50mb' }));

// Add routes
api.use(authRouter);
api.use(recipeRouter);

module.exports = api;
