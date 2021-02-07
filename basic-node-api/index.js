require('dotenv').config({
  path: __dirname + './.env'
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5010;

const { insertEntry, updateEntry, getEntries } = require('./methods');

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

app.get('/get-entries', getEntries);
app.post('/insert-entry', insertEntry);
app.post('/update-entry', updateEntry);

app.listen(port, () => {
  console.log(`App running... on port ${port}`);
});