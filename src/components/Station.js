import React from 'react';
import {useParams} from 'react-router-dom';

const Station = () => {
  const { name } = useParams();
  return <div>
  <h3>Station {name}</h3>
  </div>
}

export default Station;
