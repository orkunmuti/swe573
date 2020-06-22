const express = require('express');
const api = express();
const authRouter = require('./routes/authRouter');
const recipeRouter = require('./routes/recipeRouter');
const imageRouter = require('./routes/imageRouter');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));
api.use(bodyParser.json({ limit: '200mb' }));

// Add routes
api.use(authRouter);
api.use(recipeRouter);
api.use(imageRouter);

module.exports = api;
