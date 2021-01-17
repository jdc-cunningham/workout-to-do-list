import './assets/styles/App.scss';

const App = () => {
  const sampleData = [ // sort on MySQL side
    {
      week: 2,
      month: "Jan",
      dateRange: "17 - 23",
      days: {
        tuesday: {
          "squats": [true, true, true],
          "push ups": [true, true, true],
          "sit ups": [true, true, true]
        },
        monday: {
          "squats": [true, false, false],
          "push ups": [true, false, false],
          "sit ups": [true, false, false]
        }
      }
    }
  ];

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

  const renderWeeks = (weeks) => {
    if (!weeks) {
      return `<p>No data</p>`;
    }

    return weeks.map((week, index) => (
      <div key={index} className="App__week-group">
        <h2>Week {week.dateRange} {week.month}</h2>
        {
          Object.keys(week.days).map((dayKey, index) => (
            <div key={index}>
              <h3>{dayKey}</h3>
              <div>
                <div>
                  
                </div>
                <div>
                  {dayWorkoutsComplete(week.days[dayKey]).complete ? 'complete' : 'incomplete'}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    ));
  }

  return (
    <div className="App">
      {renderWeeks(sampleData)}
    </div>
  );
}

export default App;
