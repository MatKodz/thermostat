import {createSlice} from "@reduxjs/toolkit";


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

export const relevesSlice = createSlice({
  name : 'relevesSlice',
  initialState : initialState,
  reducers : {
    addReleve : (state,action) => {
      state.listeReleves.push(action.payload)
  }
}
})

export const { addReleve } = relevesSlice.actions

export const selectReleves = (state) => state.relevesSlice.listeReleves;

export default relevesSlice.reducer
