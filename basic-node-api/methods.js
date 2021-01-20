const { pool } = require('./dbConnect');

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

  pool.query(
    `INSERT INTO entries SET week = ?, month = ?, day = ?, year = ?, workout_data_id = ?`,
    [week, month, day, year, workoutDataId],
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