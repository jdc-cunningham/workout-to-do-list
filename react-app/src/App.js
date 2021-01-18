import './assets/styles/App.scss';
import DayRow from './components/day-row/DayRow';

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

  const renderWeeks = (weeks) => {
    if (!weeks || !weeks.length) {
      return <p>No data</p>;
    }

    return weeks.map((week, index) => (
      <div key={index} className="App__week-group">
        <h2>Week {week.dateRange} {week.month}</h2>
        {
          Object.keys(week.days).map((dayKey, index) => (
            <DayRow key={index} day={dayKey} dayData={week.days[dayKey]}/>
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
