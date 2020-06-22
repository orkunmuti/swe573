const express = require('express');
const imageRouter = express.Router();
const { getImages } = require('../controllers/imageController');

// GET IMAGES
imageRouter.route('/images').get(getImages);

module.exports = imageRouter;
