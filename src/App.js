/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

import HomePage from './pages/home/HomePage';
import FinanceChartPage from './pages/chart/FinanceChartPage';
import MainLayout from './layouts/MainLayout';


function App() {
  const routes = (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/chart" component={FinanceChartPage} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <MainLayout routes={routes} />
    </BrowserRouter>
  );
}

export default App;
