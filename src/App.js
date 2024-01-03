import React,{Suspense} from 'react';
import ThermostatSimple from './components/Thermostat_simple';
import ThermostatGlobal from './components/Thermostat_global';
import StationsGroundWater from './components/Stations_API';
import Layout from './components/Layout';
import Home from './components/Home';
import Station from './components/Station';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Loading from './components/Loader';
//import Releves from './components/Releves';
import Releves from './components/Releves';
import RelevesSlice from './components/RelevesSlice';
import "./scss/style.scss";

import store from './store.js';
import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//import { Routes, Route } from "react-router-dom";

function App(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children : [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/unique",
          element: <ThermostatSimple />,
        },
        {
          path: "/global",
          element: <ThermostatGlobal />,
        },
        {
          path: "/api",
          element:     <Suspense fallback={<Loading />}><StationsGroundWater /></Suspense>,
        },
        {
          path: "/station/:name",
          element: <Station />,
        },
        {
          path: "/releves",
          element: <Releves />,
        },
        {
          path: "/releves-slice",
          element: <RelevesSlice />,
        },
        {
          path: "*",
          element: <NotFound />,
        }
      ]
    }
  ])
  return  <>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </>
}
export default App;
