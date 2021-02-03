import React, { useState, useEffect } from 'react';
import './assets/styles/App.scss';
import DayRow from './components/day-row/DayRow';
import DayChecklist from './components/day-checklist/DayChecklist';
import axios from 'axios';

const App = () => {
  const [activeDayData, setActiveDayData] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const sampleData = [
    {
      "id": 1,
      "date": "2020-02-03T06:00:00.000Z",
      "workouts_data": {
        "squats": [true, false, false],
        "push ups": [true, false, false],
        "sit ups": [true, false, false]
      }
    }
  ];

  const formatDate = (request) => {
    // this doesn't work the yyyy-mm-dd to date
    var d = request?.date ? new Date(request.date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if (request && request.type === "day") {
      return days[d.getDay()];
    }
  
    return [year, month, day].join('-');
  }

  const blankEntry = {
    "day": formatDate({ type: "day" }),
    "date": formatDate(),
    "workouts": {
      "squats": [false, false, false],
      "push ups": [false, false, false],
      "sit ups": [false, false, false]
    }
  };

  const renderWeeks = (workouts) => {
    if (!workouts || !workouts.length) {
      return <p>No data</p>;
    }



    return workouts.map((workout, index) => (
      <div key={index} className="App__week-group">
        {/* <h2>Week {week.dateRange} {week.month}</h2> */}
        <button type="button" onClick={ () => { setActiveDayData(blankEntry) } }>Add entry</button>
        {
          <DayRow
            key={workout.id}
            dayData={workout.date} // this is wrong, yyyy-mm-dd to date object not working though
            clickHandler={setActiveDayData}
          />
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

  // get data on load
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/get-entries`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCurrentData(res.status.data);
        } else {
          alert('Failed to get data');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      {renderWeeks(sampleData)}
      {activeDayModal(activeDayData)}
    </div>
  );
}

export default App;
