const express = require('express');
const api = express();
const authRouter = require('./routes/authRouter');
const recipeRouter = require('./routes/recipeRouter');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// Add routes
api.use(authRouter);
api.use(recipeRouter);

// TODO: move all controllers in the src/api/controllers folder
api.get('/', (req, res) => {
  res.send({
    message: 'Hello from the API',
  });
});

module.exports = api;
