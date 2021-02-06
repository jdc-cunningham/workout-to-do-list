import './DayRow.scss';

const DayRow = (props) => {
  const { dayData, clickHandler } = props;
  const { date, workout_data } = dayData;

  const dayWorkoutsComplete = (workouts) => {
    // ehh this isn't clean
    let total = 0;  
    let complete = 0;
    Object.keys(workouts).forEach(workout => (
      workouts[workout].forEach(set => {
        total += 1;
        if (set) {
          complete += 1;
        }
      })
    ));

    return {
      complete: (complete / total === 1),
      percentage: (complete / total * 100)
    }
  }

  const workoutProgress = dayWorkoutsComplete(JSON.parse(workout_data));
  const workoutProgressPercentage = workoutProgress.percentage;

  // redundant code
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateObj = new Date(date);
  const dayNum = dateObj.getDay();

  const toMdy = (ymdString) => {
     const stringParts = ymdString.split('-');
     return `${stringParts[1]}/${stringParts[2]}/${stringParts[0]}`;
  }

  return (
    <div className="App__day-row" onClick={() => clickHandler(dayData)}>
      <p className="full-width bold">{toMdy(date.split('T')[0])}</p>
      <span>
        <h3>{days[dayNum].substring(0, 3)}</h3>
        <div className="completion-block">
          <div className="percentage">
            <div className="percentage-bar">
              <div
                className={`percentage-bar__internal ${workoutProgressPercentage === 100 ? 'green' : 'orange'}`}
                style={{width: `${workoutProgressPercentage.toFixed(0)}%`}}
              />
            </div>
            <div className="percentage-text">
              {workoutProgress.percentage.toFixed(0)}%
            </div>
          </div>
          <div className="completion-text">
            workout {workoutProgress.complete ? 'complete' : 'incomplete'}
          </div>
        </div>
      </span>
    </div>
  )
}

export default DayRow;