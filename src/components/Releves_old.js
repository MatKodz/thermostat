import React from 'react';
import {connect} from 'react-redux';
import store from '../store.js'


function Releves({listeReleves}) {

  const addReleve = () => {
    store.dispatch({type : "AJOUTER_RELEVE"})
  }
  return <div>
  <img src="redux_logo.png" />
  { listeReleves.map( releve => <p key={releve.id}>{releve.value}</p>)}
  <button onClick={addReleve}>Ajouter un relevé fictif</button>
    </div>
}

const mapStateToProps = all => all

export default connect(mapStateToProps)(Releves);
