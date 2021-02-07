const { pool } = require('./dbConnect');

// straight outta SO
// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
const formatDate = () => {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const insertEntry = (req, res) => {
  const { date, workoutData } = req.body;
  // ehh I could put validation here if row exists etc...
  // but I'll just catch it on the front end

  if (!workoutData) {
    res.status(400).send('invalid data');
  }

  pool.query(
    `INSERT INTO entries SET date = ?, workout_data = ?`,
    [date, JSON.stringify(workoutData)],
    (err, sqlRes) => {
      if (err) {
        console.log('insertEntry', err); // if you were capturing server side logs
        res.status(400).send('failed to insert');
      } else {
        res.status(204).send('success');
      }
    }
  );
}

const updateEntry = (req, res) => {
  const { entryId, date, workoutData } = req.body;
  
  if (!entryId) {
    res.status(400).send('invalid data');
    return;
  }

  pool.query(
    `UPDATE entries SET date = ?, workout_data = ? WHERE id = ?`,
    [date, JSON.stringify(workoutData), entryId],
    (err, sqlRes) => {
      if (err) {
        console.log('updateEntry', err);
        res.status(400).send('failed to update');
      } else {
        res.status(200).send('success');
      }
    }
  );
}

const getEntries = (req, res) => {
  pool.query(
    `SELECT * FROM entries ORDER BY id DESC LIMIT 30`,
    (err, sqlRes) => {
      if (err) {
        console.log('getEntries', err);
        res.status(400).send('failed to retrieve entries');
      } else {
        res.status(200).send(sqlRes);
      }
    }
  );
}

module.exports = {
  insertEntry,
  updateEntry,
  getEntries
}