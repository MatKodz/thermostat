import React, {useState, useEffect} from 'react';
import "./style.scss";

export default function TemperatureController() {
  return <div className="wrapper-controller">
  <TemperatureItem temperatureUnit="C" temperatureValue="30" temperatureName="Degré Celsius" temperatureSteps="20" tempMin="-10" tempMax="90" />
  <TemperatureItem temperatureUnit="F" temperatureValue="100" temperatureName="Fahrenheit" temperatureSteps="40" tempMin="10" tempMax="210"/>
  </div>
}

let count = 0;

function TemperatureItem ({temperatureValue, temperatureUnit,temperatureName,temperatureSteps,tempMin,tempMax}) {

  const [tempValue,setTempValue] = useState(+temperatureValue);

  useEffect(
    () => {
          console.log("count :" + count)
          count++
    }
  )

  const tempSteps = () => {
    let tempArray = new Array(4);
    return tempArray.fill(0).map((e,index) => (( (+tempMin) + (index + 1) * temperatureSteps )))
  }

  const farenheitToDegree = (value,unit) => {
    if (unit == 'F') // convert to celsius
    return ((value - 32) * (5/9)).toFixed(1)
    else if(unit == 'C') // convert to Fahrenheit
    return (value * (9/5) + 32).toFixed(1)
  }
  return <div>
      <h3 className="temp-unit">{temperatureName} - <span>{temperatureUnit}</span></h3>
      <div className="temp-display">{tempValue}°{temperatureUnit}</div>
      <div className="temp-control">
       <button onClick={ () => setTempValue(temp - 1)}> - </button>
       <button onClick={ () => setTempValue(temp + 1)}> + </button>
      </div>
      <div>Equivalent à : {farenheitToDegree(tempValue,temperatureUnit)} °{temperatureUnit == "F" ? "Degree Celsius" : "Farhenheit"}</div>
      <div className="range-control">
      <input type="range" className="range-indicator" min={tempMin} max={tempMax} value={tempValue} onChange={ (e) => setTempValue(event.target.value)} list={"range-steps-" + temperatureUnit} />
      <datalist className="range-steps" id={"range-steps-" + temperatureUnit}>
        <option value={tempMin} label={tempMin}></option>
        {tempSteps().map((e,i) =>
        <option value={e} label={e} key={i}></option>
        )}
        <option value={tempMax} label={tempMax}></option>
      </datalist>
      </div>
  </div>;
}
