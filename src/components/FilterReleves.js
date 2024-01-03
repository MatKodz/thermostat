import React from 'react';
import {useDispatch} from 'react-redux';
import {filterByValue} from '../features/relevesSlice';

const MORE_THAN_50 = "filters/more_50";
const LESS_THAN_50 = "filters/less_50";
const ALL = "filters/all";

export default function FilterReleves() {

  const dispatch = useDispatch();

  const handleClickFilter = (moreLess) => {
    dispatch(filterByValue(moreLess))
  }

  // les 3 buttons permettent de modifier la propriété filter du state

  return <div>
    <button onClick={ () => handleClickFilter(MORE_THAN_50) }>Filtrer &gt; 50 </button>&nbsp;
    <button onClick={ () => handleClickFilter(LESS_THAN_50) }>Filtrer &lt; 50 </button>&nbsp;
    <button onClick={ () => handleClickFilter(ALL) }>Tout afficher</button>
    </div>
}
