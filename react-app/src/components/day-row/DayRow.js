import './DayRow.scss';

const DayRow = (props) => {
  const { day, dayData } = props;
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

  const workoutProgress = dayWorkoutsComplete(dayData);
  const workoutProgressPercentage = workoutProgress.percentage;

  return (
    <div className="App__day-row">
      <h3>{day.substring(0, 3)}</h3>
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
    </div>
  )
}

export default DayRow;