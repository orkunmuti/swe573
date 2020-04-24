const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => res.send('Hello foodstore!'));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
