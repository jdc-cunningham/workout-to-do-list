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

const insertWorkout = async (workoutData) => {
  return new Promise(resolve => {
    pool.query(
      `INSERT INTO workout_data SET workout = ?`,
      [JSON.stringify(workoutData)],
      (err, res) => {
        if (err) {
          console.log('insertWorkout', err);
          resolve(false);
        } else {
          resolve(res.insertId);
        }
      }
    );
  });
}

const insertEntry = async (req, res) => {
  const { week, month, day, year, workoutData } = req.body;
  const workoutDataId = await insertWorkout(workoutData);

  if (!workoutDataId) {
    res.status(400).send('fail1');
  }

  const date = formatDate();

  pool.query(
    `INSERT INTO entries SET week = ?, month = ?, day = ?, year = ?, date = ?, workout_data_id = ?`,
    [week, month, day, year, date, workoutDataId],
    (err, res2) => {
      if (err) {
        console.log('insertEntry', err);
        res.status(400).send('fail2');
        return;
      } else {
        res.status(204).send('success');
        return;
      }
    }
  );
}

module.exports = {
  insertEntry
}