import React from 'react';
// import {connect} from 'react-redux';
import {useSelector} from 'react-redux';
import {selectReleves} from '../features/relevesSlice'
import store from "../store.js";


console.log(store.getState())

const xx = store.subscribe( () => console.log("state has changed"))


console.log(selectReleves)


export default function Releves() {
  const listeReleves = useSelector(selectReleves);
  console.log(listeReleves)
  return <div>
  <img src="logo-kodz.png" />
  { listeReleves.map( releve => <p>{releve.value}</p>)}
    </div>
}
