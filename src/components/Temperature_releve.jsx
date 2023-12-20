import React, {useState, useId} from 'react';
import {addReleve} from '../features/relevesSlice';
import {useDispatch} from 'react-redux';

export default function TemperatureList({tempValue,tempUnit}) {

  const dispatch = useDispatch();

  const id = useId();

  const [username, setUsername] = useState("");
  const [statementList,setStatementList] = useState([]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  }
  const handleClickRegister = (e) => {
    if(username) {
      let currentDay = new Date();
      currentDay = currentDay.toLocaleString()
      let result = tempValue + "°" + tempUnit + " , le " +  currentDay + " par " + username
      setStatementList(prevState => [...prevState,result])
      dispatch(addReleve({id: id, value: result}))
      console.log("dispatched")

      setUsername("")
    }
    else e.target.style = "border: 2px solid red"

  }

  let currentDay = new Date();
  currentDay = currentDay.toLocaleString()
  return <div>
    <hr />
    <label>Enter your name : </label>
    <input type="text" onChange={handleChange} value={username} />
    <hr />
    <button onClick={handleClickRegister} >Register</button>
    <div>
      {
        statementList &&
        <ul className="statement-list">
        { statementList.map( (e,i) => <li key={i}>{e}</li>) }
        </ul>
      }

    </div>
  </div>
}
