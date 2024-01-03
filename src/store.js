import {configureStore} from '@reduxjs/toolkit';
import reducer from './features/reducer.js';
import relevesReducer from "./features/relevesSlice";

export default configureStore({
  reducer : {
    releves : reducer,
    relevesSlice : relevesReducer
  }
})
