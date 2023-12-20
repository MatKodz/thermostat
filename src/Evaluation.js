import React, {useState, useEffect, useRef} from 'react';
import "./style.scss";
import Navbar from "./Navbar";
import { SwitchTransition, CSSTransition} from 'react-transition-group';


const villes = [
  {name:"Montpellier", temp: 14},
  {name: "Béziers", temp : 14},
  {name: "Nîmes", temp : 12},
  {name: "Alès", temp : 10},
  {name: "Perpignan", temp : 10},
]

export default function Thermostat() {
  return (
  <> Evaluation
    <div className="wrapper-controller">
      <TemperatureItem temperatureUnit="C" temperatureValue="30" temperatureName="Degré Celsius" temperatureSteps="20" tempMin="-10" tempMax="90" />
    </div>
  </>
  );
}

let count = 0;

function TemperatureItem ({temperatureValue,temperatureUnit,temperatureName,temperatureSteps,tempMin,tempMax}) {

  useEffect(
    () => {
          console.log("count :" + count)
          count++
    }
  )

  const tempSteps = () => {
    let tempArray = new Array(6);
    return tempArray.fill(0).map((e,index) => (( (+tempMin) + (index) * temperatureSteps )))
  }

  return <div className="temp-item">
      <h3 className="temp-unit">Occitanie</h3>
      {villes.map( ville => <City ville={ville.name} tempValue={ville.temp} />)}
  </div>;
}


function City({ville,tempValue}) {

  const tempToTemp = (value,unit) => {
    if (unit == 'F') // convert to celsius
    return ((value - 32) * (5/9)).toFixed(1)
    else if(unit == 'C') // convert to Fahrenheit
    return (value * (9/5) + 32).toFixed(1)
  }

  const refC = useRef(null);
  const refF = useRef(null);

  // const [tempValue,setTempValue] = useState(20);
  const [dispTemp,setDispTemp] = useState("C");

  function onClickUnit() {
    if( dispTemp == 'C') setDispTemp("F")
    else setDispTemp("C")
  }

  const tempF = tempToTemp(tempValue,"C");

  return (
    <div className="city">
    <div><h3>{ville}</h3></div>
    <SwitchTransition mode={'out-in'}>
    <CSSTransition
     key={"ref" + dispTemp}
     timeout={100}
     nodeRef={dispTemp == "C" ? refC : refF}
     //addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
     classNames='fade'>
         <div ref={dispTemp == "C" ? refC : refF} className={"temp-display temp-display-city temp-display-" + dispTemp}>
          {dispTemp == 'C' ? tempValue : tempF}°{dispTemp}
          <button onClick={onClickUnit}> > {dispTemp == "C" ? "F" : "C" }</button>
           </div>
     </CSSTransition>
     </SwitchTransition>
     </div>
  )

}
