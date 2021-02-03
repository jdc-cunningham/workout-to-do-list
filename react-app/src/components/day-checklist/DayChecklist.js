import './DayChecklist.scss';

const DayChecklist = (props) => {
  console.log('dc', props);
  const { workoutData, setActiveDayData } = props;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateParts = workoutData.date.split("-");
  const titleString = `${workoutData.day} ${months[parseInt(dateParts[1]) - 1]}, ${dateParts[2]} ${dateParts[0]}`;

  return (
    <div className="App__day-checklist">
      <button type="button" className="close" onClick={() => { setActiveDayData(null) }}><span>x</span></button>
      <h2>{ titleString }</h2>
    </div>
  )
}

export default DayChecklist;