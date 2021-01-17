import './assets/styles/App.css';

const App = () => {
  const sampleData = [ // sort on MySQL side
    {
      week: 2,
      month: "Jan",
      dateRange: "17 - 23",
      days: {
        tuesday: {
          "squats": [true, false, false],
          "push ups": [true, false, false],
          "sit ups": [true, false, false]
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
    console.log(weeks);
    if (!weeks) {
      return `<p>No data</p>`;
    }

    return weeks.map((week, index) => (
      <div key={index} className="App__week-group">
        <h2>Week {week.dateRange} {week.month}</h2>
        
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
