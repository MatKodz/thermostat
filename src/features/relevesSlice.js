import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  listeReleves :
  [
    {
      releveId: 1,
      releveTemp: 27,
      releveUnit: "C",
      releveName :  "Elodie"
    },
    {
      releveid: 2,
      releveTemp: 59,
      releveUnit : "F",
      releveName: "Sam"
    },
    {
      releveId: 3,
      releveTemp: 56,
      releveUnit: "F",
      releveName: "Marc"
    }
],
  filterBy : "all",
};

export const relevesSlice = createSlice({
  name : 'relevesSlice',
  initialState : initialState,
  reducers : {
    addReleve : (state,action) => {
      state.listeReleves.push(action.payload)
  },
  filterByValue : (state, action) => {
    return {...state, filterBy : action.payload}
  }
}
})

export const { addReleve, filterByValue } = relevesSlice.actions

//export function to select releves data
export const selectReleves = (state) => state.relevesSlice.listeReleves;
//export function to select filter chosen
export const selectFilter = (state) => state.relevesSlice.filterBy;

export default relevesSlice.reducer
