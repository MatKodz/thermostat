import React, {useState, useEffect, useCallback, useRef,memo} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

let countTempC = 0;
let countTempF = 0;
let countTempList = 0;

export default function Thermostats() {

  const [temp,setTemp] = useState({c:27, f:81});

  const onChangeTempHandle = useCallback((e,unit) => {
    let tempTemp = {c: 0,f :0}
    if(unit == "C") {
      tempTemp.c = Number(e.target.value)
      tempTemp.f = Math.round((tempTemp.c * (9/5) + 32))

    }
    else if (unit == 'F') {
      tempTemp.f = Number(e.target.value)
      tempTemp.c = ((tempTemp.f - 32) * (5/9)).toFixed(1)
    }
    setTemp(prevState => tempTemp)
  },[temp])

  const onClickButtonPlus = (unit) => {
    (unit == 'C') ?
    setTemp({...temp, c: (temp.c + 1)}) :
    (unit == 'F') ?
    setTemp({...temp, f: (temp.f + 1)}) : null
  }
  const onClickButtonMinus = (unit) => {
    (unit == 'C') ?
    setTemp({...temp, c: (temp.c - 1)}) :
    (unit == 'F') ?
    setTemp({...temp, f: (temp.f - 1)}) : null
  }

  return <>
    <h2> Ce composant affiche un thermostat dépendant de l'autre, la variation de température de l'un entraîne la variation de l'autre</h2>
      <div className="wrapper-controller">
      <TemperatureItem onClickButtonPlus={onClickButtonPlus} onClickButtonMinus={onClickButtonMinus} onChangeTempHandle={onChangeTempHandle} temperatureUnit="C" temperatureValue={temp.c} temperatureName="Degré Celsius" temperatureSteps="20" tempMin="-10" tempMax="90" />
      <TemperatureItem onClickButtonPlus={onClickButtonPlus} onClickButtonMinus={onClickButtonMinus} onChangeTempHandle={onChangeTempHandle} temperatureUnit="F" temperatureValue={temp.f} temperatureName="Fahrenheit" temperatureSteps="40" tempMin="10" tempMax="200" />
      </div>
    </>
}

  // memoization de temperatureList pour éviter un rerender systématique, les states ont été montés dans le parent
  const TemperatureList = memo(function TemperatureList ({handleClickRegister,statementList,handleChangeName,username}) {

  console.log("TemperatureList has rendered ", countTempList++)

  let currentDay = new Date();
  currentDay = currentDay.toLocaleString()
  return <div>
    <hr />
    <label>Enter your name : </label>
    <input type="text" onChange={handleChangeName} value={username} />
    <hr />
    <button onClick={handleClickRegister} >Register</button>
    <div>
      {
        statementList &&
        <ul className="statement-list">
        <TransitionGroup>
          { statementList.map( (statementItem,i) =>
            <CSSTransition key={i} timeout={500} classNames="item-statement">
              <li key={i}>{statementItem}</li>
            </CSSTransition>)
          }
        </TransitionGroup>
        </ul>
      }
    </div>
  </div>
});


function TemperatureItem ({tempColor, temperatureValue, temperatureUnit,temperatureName,temperatureSteps,tempMin,tempMax,onChangeTempHandle,onClickButtonPlus,onClickButtonMinus}) {

  const message = "Température trop élévée, supérieur à 60 dégrés";
  // const [showMessage,setShowMessage] = useState(false);

  console.log("TemperatureItem has rendered", (temperatureUnit == "C") ? ("in Celsius " + countTempC++ + " times") : ("in Farenheit " + countTempF++ + " times") );


  useEffect(
    () => {
          /*
          // test affichage de la ref ds le DOM
          if(temperatureValue > 50 && temperatureUnit == "C") {
            setMessage("Température trop élévée")
            setShowMessage(true)
          }
          else setShowMessage(false)
          */

    }
  )

  const showMessage = (temperatureValue > 50 && temperatureUnit == "C") ? true : false

  const messageTemp = useRef(null);

  const tempSteps = Array.from({length: 6}, (_,index) => (+tempMin) + (index) * temperatureSteps)

  const farenheitToDegree = (value,unit) => {
    if (unit == 'F') // convert to celsius
    return ((value - 32) * (5/9)).toFixed(1)
    else if(unit == 'C') // convert to Fahrenheit
    return (value * (9/5) + 32).toFixed(1)
  }


  const [statementList,setStatementList] = useState([]);
  const [username, setUsername] = useState("");

  const handleChangeName = useCallback( (e) => {
    setUsername(e.target.value);
  },[username]);

  const handleClickRegister = useCallback( () => {
    if(username.length > 2) {
      let currentDay = new Date();
      currentDay = currentDay.toLocaleString()
      let result = temperatureValue + "°" + temperatureUnit + " , le " +  currentDay + " par " + username
      setStatementList(prevState => [...prevState,result])
      setUsername("")
    }

  },[username]);

  const bgPosition = Math.round( (tempMax - temperatureValue) / (tempMax - tempMin) * 100);
  const bgPositionP = bgPosition.toString().concat("%")


  return <div className="temp-item">
      <h3 className="temp-unit">{temperatureName} - <span>{temperatureUnit}</span></h3>
      <div className="temp-display temp-color" style={{backgroundPositionY: bgPositionP}}>{temperatureValue}°{temperatureUnit}</div>
      <div className="temp-control">
       <button onClick={() => onClickButtonMinus(temperatureUnit)} disabled={temperatureValue <= tempMin ? true : false}> - </button>
       <button onClick={() => onClickButtonPlus(temperatureUnit)} disabled={temperatureValue >= tempMax ? true : false}> + </button>
      </div>
      <div>Equivalent à : {farenheitToDegree(temperatureValue,temperatureUnit)} °{temperatureUnit == "F" ? "Degree Celsius" : "Farhenheit"}</div>
      <div className="range-control">
          <input type="range" className="range-indicator" min={tempMin} max={tempMax} value={temperatureValue} onChange={(e) => onChangeTempHandle(e,temperatureUnit)} list={"range-steps-" + temperatureUnit} />
          <datalist className="range-steps" id={"range-steps-" + temperatureUnit}>
            <option value={tempMin} label={tempMin}></option>
            {tempSteps.map((e,i) =>
            <option value={e} label={e} key={i}></option>
            )}
            <option value={tempMax} label={tempMax}></option>
          </datalist>
      </div>
      <CSSTransition nodeRef={messageTemp} in={showMessage} timeout={500} classNames="temp-message" unmountOnExit>
        <div className="temp-message" ref={messageTemp}>{message}</div>
      </CSSTransition>
      <TemperatureList handleClickRegister={handleClickRegister} statementList={statementList} handleChangeName={handleChangeName} username={username} />
  </div>;
}
