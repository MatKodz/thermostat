import React, {useState, useEffect} from 'react';
import TemperatureList from "./Temperature_releve.jsx";

export default function Thermostats() {
  return (
  <>
  <h2> Ce composant affiche un thermostat simple, les 2 thermostats sont indépendants l'un de l'autre</h2>
    <div className="wrapper-controller">
      <TemperatureItem temperatureUnit="C" temperatureValue="30" temperatureName="Degré Celsius" temperatureSteps="20" tempMin="-10" tempMax="90" />
      <TemperatureItem temperatureUnit="F" temperatureValue="100" temperatureName="Fahrenheit" temperatureSteps="40" tempMin="10" tempMax="210"/>
    </div>
  </>
  );
}

let count = 0;


function TemperatureItem ({temperatureValue, temperatureUnit,temperatureName,temperatureSteps,tempMin,tempMax}) {

  const [tempValue,setTempValue] = useState(+temperatureValue);

  useEffect(
    () => {
          console.log("countRerender :" + count)
          count++
    }
  )

 /*
  const tempSteps = () => {
    let tempArray = new Array(6);
    return tempArray.fill(0).map((e,index) => (( (+tempMin) + (index) * temperatureSteps )))
  }
  */

  const tempSteps = Array.from({length: 6}, (_,index) => (+tempMin) + (index) * temperatureSteps)

  const tempToTemp = (value,unit) => {
    if (unit == 'F') // convert to celsius
    return ((value - 32) * (5/9)).toFixed(1)
    else if(unit == 'C') // convert to Fahrenheit
    return (value * (9/5) + 32).toFixed(1)
  }
  return <div className="temp-item">
      <h3 className="temp-unit">{temperatureName} - <span>{temperatureUnit}</span></h3>
      <div className="temp-display">{tempValue}°{temperatureUnit}</div>
      <div className="temp-control">
       <button onClick={ () => setTempValue(temp - 1)}> - </button>
       <button onClick={ () => setTempValue(temp + 1)}> + </button>
      </div>
      <div>Equivalent à : {tempToTemp(tempValue,temperatureUnit)} °{temperatureUnit == "F" ? "Degree Celsius" : "Farhenheit"}</div>
      <div className="range-control">
      <input type="range" className="range-indicator" min={tempMin} max={tempMax} value={tempValue} onChange={ (e) => setTempValue(event.target.value)} list={"range-steps-" + temperatureUnit} />
      <datalist className="range-steps" id={"range-steps-" + temperatureUnit}>
        {tempSteps.map((e,i) =>
        <option value={e} label={e} key={i}></option>
        )}
      </datalist>
      </div>
      <TemperatureList tempValue={tempValue} tempUnit={temperatureUnit} />
  </div>;
}
