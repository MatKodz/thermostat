import React from 'react';
import {useSelector} from 'react-redux';
import {selectReleves, selectFilter} from '../features/relevesSlice'
import store from "../store.js";
import FilterReleves from './FilterReleves';

const xx = store.subscribe( () => console.log("state has changed",store.getState() ))

export default function Releves() {

  const listeReleves = useSelector(selectReleves);

  const filterOption = useSelector(selectFilter);

  const [MORE_THAN_50, LESS_THAN_50, ALL]  = ["filters/more_50", "filters/less_50", "filters/all"]


  // cette fonction s'appuie sur la valeur de la propriété filterBy du state, quand cette propriété du state évolue, les données sont filtrées selon le cas (le state "listeReleves" n'est pas modifié, on filtre seulement les résultats à afficher grâceà cette fonction)
  const filterReleves = (filterType) => {
    if (filterType == MORE_THAN_50) {
      return listeReleves.filter( releve => releve.releveTemp > 50)
    }
    else if (filterType == LESS_THAN_50) {
      return listeReleves.filter( releve => releve.releveTemp < 50)
    }
    else if (filterType == ALL) {
      return listeReleves
    }
    else return listeReleves
  }

  return <div>
  <img src="redux_logo.png" />
  { filterReleves(filterOption).map( releve =>
    <p key={releve.id}>
    {releve.releveName} a enregistré le {releve.releveDate ? releve.releveDate : "xx:xx"} : &nbsp;
    <span className="releve-temp-value">{releve.releveTemp}° {releve.releveUnit}</span></p>)
  }
  <FilterReleves />
    </div>
}
