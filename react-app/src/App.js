import React, { useState, useEffect } from 'react';
import './assets/styles/App.scss';
import DayRow from './components/day-row/DayRow';
import DayChecklist from './components/day-checklist/DayChecklist';
import axios from 'axios';
import LoadingIcon from './assets/icons/ajax-loader.gif';

const App = () => {
  const [activeDayData, setActiveDayData] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  // mocks
  // const sampleData = [
  //   {
  //     "id": 1,
  //     "date": "2020-02-03T06:00:00.000Z",
  //     "workout_data": {
  //       "squats": [true, false, false],
  //       "push ups": [true, false, false],
  //       "sit ups": [true, false, false]
  //     }
  //   }
  // ];

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

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (request && request.type === "day") {
      return days[d.getDay()];
    }
  
    return [year, month, day].join('-');
  }

  // used to populate new form fields
  const blankEntry = {
    "date": formatDate(),
    "workout_data": JSON.stringify({
      "squats": [false, false, false],
      "push ups": [false, false, false],
      "sit ups": [false, false, false]
    })
  };

  const renderWeeks = (workouts) => {
    if (!workouts || !workouts.length) {
      return <p>Fetching data... <img src={LoadingIcon} alt='loading icon'/></p>;
    }

    return workouts.map((workout, index) => (
      <div key={index} className="App__week-group">
        {/* <h2>Week {week.dateRange} {week.month}</h2> */}
        {
          <DayRow
            key={workout.id}
            dayData={workout}
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

    return <DayChecklist getLatestData={getLatestData} workoutData={dayData} setActiveDayData={setActiveDayData} date={formatDate()} />;
  }

  const getLatestData = () => {
    axios.get(`${process.env.REACT_APP_API_BASE}/get-entries`)
    .then((res) => {
      if (res.status === 200) {
        setCurrentData(res.data);
      } else {
        alert('Failed to get data');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // get data on load
  useEffect(() => {
    getLatestData();
  }, []);

  return (
    <div className="App">
      <span className="full-width-row">
        <h2>Workouts</h2>
        <button type="button" onClick={ () => { setActiveDayData(blankEntry) } }>Add entry</button>
      </span>
      {renderWeeks(currentData)}
      {activeDayModal(activeDayData)}
    </div>
  );
}

export default App;
