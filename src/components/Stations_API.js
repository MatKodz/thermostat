import React, {useState, useEffect, Suspense} from 'react';
import Loading from "./Loader.js";
import useWaterDatas from "../hooks/useWaterDatas.js"


export default function StationsGroundWater() {

  let url = "https://data.bs.ch//api/explore/v2.1/catalog/datasets/100179/records?select=stationname%2C%20value%2C%20time%2C%20date%2C%20stationid&where=time%20%3D%20%2210%3A00%3A00%22%20and%20date%20%3D%20%222023-10-26%22&limit=20&refine=sensname%3A%22Temperatur%22"

  const allStationsDatas = useWaterDatas(url);

  return <div>
      <Suspense fallback={<Loading />}>
        <h2>Liste des températures des nappes phréatiques</h2>
        <StationsList allStationsDatas={allStationsDatas} />
      </Suspense>
  </div>
}

let count = 0;

function StationsList({allStationsDatas}) {
  return     <div className="wrapper-controller">
            { allStationsDatas && allStationsDatas.map( (station) =>
             <TemperatureItem temperatureUnit="C" key={station.stationid} time={station.time} date={station.date} stationName={station.stationname} temperatureValue={station.value} temperatureName="Degré Celsius" temperatureSteps="20" tempMin="-10" tempMax="90" />
              )
            }
            </div>;
}

function TemperatureItem ({temperatureValue, temperatureUnit, stationName, date, time, temperatureName,temperatureSteps,tempMin,tempMax}) {

  const tempSteps = Array.from({length: 6}, (_,index) => (+tempMin) + (index) * temperatureSteps)

  const tempToTemp = (value,unit) => {
    if (unit == 'F') // convert to celsius
    return ((value - 32) * (5/9)).toFixed(1)
    else if(unit == 'C') // convert to Fahrenheit
    return (value * (9/5) + 32).toFixed(1)
  }

  temperatureValue = temperatureValue ? temperatureValue : "0";

  return <div className="temp-item">
      { /* <h3 className="temp-unit">{temperatureName} - <span>{temperatureUnit}</span></h3> */}
      <div className="temp-location"><h3>{stationName}</h3></div>
      <div className="temp-location-details">{time} {date}</div>
      <div className="temp-display">
      <h3>{temperatureValue}°{temperatureUnit}</h3>
      <div className="temp-f">Equivalent à : {tempToTemp(temperatureValue,temperatureUnit)} °{temperatureUnit == "F" ? "Degree Celsius" : "Farhenheit"}</div>
</div>
      <div className="range-control">
      <input type="range" className="range-indicator" min={tempMin} max={tempMax} value={temperatureValue} readOnly list={"range-steps-" + temperatureUnit} />
      <datalist className="range-steps" id={"range-steps-" + temperatureUnit}>
        {tempSteps.map((e,i) =>
        <option value={e} label={e} key={i}></option>
        )}
      </datalist>
      </div>
  </div>;
}
