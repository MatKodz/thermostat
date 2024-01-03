

const initialState = {
  listeReleves :
  [
    {
      "id": 1,
      "value": "27°C , le 18/12/2023, 10:04:14 par Elodie"
    },
    {
      "id": 2,
      "value": "59°C , le 18/12/2023, 10:04:19 par Sam"
    },
    {
      "id": 3,
      "value": "19°C , le 18/12/2023, 10:04:26 par Marc"
    }
]
};


export default function toDoReducer(state = initialState, action) {
  switch (action.type) {
    case "AJOUTER_RELEVE":
    return {
       ...state, listeReleves : [...state.listeReleves,
         {
      id : 99,
      value : "Température de 100 degrés enregistrée à xxx"
        }
      ]
    }
    default:
    return state
  }
}
