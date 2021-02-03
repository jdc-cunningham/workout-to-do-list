import React, { useState, useEffect } from 'react';
import './assets/styles/App.scss';
import DayRow from './components/day-row/DayRow';
import DayChecklist from './components/day-checklist/DayChecklist';

const App = () => {
  const [activeDayData, setActiveDayData] = useState(null);

  const generateDateInfo = () => {
    
  }

  const sampleData = [ // sort on MySQL side
    {
      week: 3,
      month: "Jan",
      dateRange: "17 - 23",
      days: [
        {
          "entryId": 2,
          "day": "Tuesday",
          "date": "2021-02-02",
          "workouts": {
            "squats": [true, false, false],
            "push ups": [true, false, false],
            "sit ups": [true, false, false]
          }
        },
        {
          "entryId": 1,
          "day": "Monday",
          "date": "2021-02-01",
          "workouts": {
            "squats": [true, false, false],
            "push ups": [true, false, false],
            "sit ups": [true, false, false]
          }
        }
      ]
    }
  ];

  const renderWeeks = (weeks) => {
    if (!weeks || !weeks.length) {
      return <p>No data</p>;
    }

    return weeks.map((week, index) => (
      <div key={index} className="App__week-group">
        <h2>Week {week.dateRange} {week.month}</h2>
        {
          week.days.map((day, index) => (
            <DayRow
              key={day.entryId}
              dayData={day}
              clickHandler={setActiveDayData}
            />
          ))
        }
      </div>
    ));
  }

  const activeDayModal = (dayData) => {
    if (!dayData) {
      return null;
    }

    return <DayChecklist workoutData={dayData} setActiveDayData={setActiveDayData} />;
  }

  return (
    <div className="App">
      {renderWeeks(sampleData)}
      {activeDayModal(activeDayData)}
    </div>
  );
}

export default App;
