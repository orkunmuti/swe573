const express = require('express');
const api = require('./api');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

require('dotenv').config();
const port = process.env.PORT || 5000;

// Configure middlewares
app.use(cors());
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'public/images')));
  app.use(express.static(path.join(__dirname, 'public/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });
}

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port},${process.env.NODE_ENV}`,
  ),
);

module.exports = app;
