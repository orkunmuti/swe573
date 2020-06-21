const express = require('express');
const api = require('./api');
const app = express();
const cors = require('cors');
require('dotenv').config();

require('dotenv').config();
const port = process.env.PORT || 5000;

// Configure middlewares
app.use(cors());
app.use('/api', api);

// TODO: move all controllers in the src/api/controllers folder
app.get('/', (req, res) => {
  res.send({
    message: 'Hello from the API',
  });
});

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port},${process.env.NODE_ENV}`,
  ),
);
