require('dotenv').config({
  path: __dirname + './.env'
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const { insertEntry } = require('./methods');

// CORs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  })
);

// routes
app.get('/',(req, res) => {
  res.status(200).send('working');
});

app.post('/insert-entry', insertEntry);

app.listen(port, () => {
  console.log(`App running... on port ${port}`);
});