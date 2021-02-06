import React, { useState } from 'react';
import axios from 'axios';
import './DayChecklist.scss';

const DayChecklist = (props) => {
  const { workoutData, setActiveDayData } = props;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateParts = workoutData.date.split("T")[0].split("-");
  // needs to be a global util
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateObj = new Date(workoutData.date);
  const dayNum = dateObj.getDay();
  const titleString = `${days[dayNum]} ${months[parseInt(dateParts[1]) - 1]}, ${dateParts[2]} ${dateParts[0]}`;
  const stateArr = [false]; // first value is offset, this is so ugly I just don't care

  // waste double loop
  const workout_data = JSON.parse(workoutData.workout_data);
  Object.keys(workout_data).map(workout => (
    workout_data[workout].map(set => stateArr.push(set))
  ));

  // make ref store of all inputs
  const [workouts, setWorkouts] = useState(stateArr);

  // SO copy again for key ugh
  const makeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // well I guess don't really need refs...
  const updateCheckbox = (element) => {
    const inc = element.target.attributes['data-inc'].value;
    let curState = workouts;
    curState[inc] = element.target.checked;
    setWorkouts([...workouts], curState);
  }

  const saveData = () => {

  }

  let inc = 0; // this is dumb

  return (
    <div className="App__day-checklist">
      <button type="button" className="close" onClick={() => { setActiveDayData(null) }}><span>x</span></button>
      <h2>{ titleString }</h2>
      {
        Object.keys(workout_data).map((workout, index) => (
          <div key={index} className="day-checklist__group">
            <h3>{ workout }</h3>
            {
              workout_data[workout].map(set => {
                inc += 1;
                return (
                  <div key={makeId(16)} className="group__checklist">
                    <p>Set {index}</p>
                    <input type="checkbox" checked={workouts[inc]} data-inc={inc} onChange={(e) => { updateCheckbox(e) }} />
                  </div>
                )
              })
            }
          </div>
        ))
      }
      <div className="day-checklist__save">
        <button type="button" onClick={ () => saveData() }>Save</button>
      </div>
    </div>
  )
}

export default DayChecklist;