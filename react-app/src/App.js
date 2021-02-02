import React, { useState, createRef, useRef, useEffect } from 'react';
import './assets/styles/App.scss';
import DayRow from './components/day-row/DayRow';

const App = () => {
  const [activeDay, setActiveDay] = useState(null);

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
          "workouts": {
            "squats": [true, true, true],
            "push ups": [true, true, true],
            "sit ups": [true, true, true]
          }
        },
        {
          "entryId": 1,
          "day": "Monday",
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
              day={day.day}
              dayData={day["workouts"]}
              clickHandler={setActiveDay}
              activeDay={day.entryId}
              />
          ))
        }
      </div>
    ));
  }

  const activeDayModal = (activeDay) => {
    console.log('wd', activeDay);

    if (!activeDay) {
      return null;
    }

    console.log('run');
  }

  useEffect(() => {
    console.log('ue', activeDay);
  }, [activeDay]);

  return (
    <div className="App">
      {renderWeeks(sampleData)}
      {activeDayModal(activeDay)}
    </div>
  );
}

export default App;
