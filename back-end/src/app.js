const express = require('express');
const api = require('./api');
const app = express();
const cors = require('cors');

require('dotenv').config();
const port = 3000;

// Configure middlewares
app.use(cors());
app.use('/api', api);

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port},${process.env.NODE_ENV}`,
  ),
);
