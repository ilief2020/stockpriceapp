import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import DashboardApp from "./DashboarApp";
import MenuApp from './components/MenuApp';

function App() {
  return (
    <Router>
      <div>
        <MenuApp />

        <hr />

        <Switch>
          <Route exact path="/stockpriceapp">
            <Home />
          </Route>
          <Route path="/dashboard">
            <DashboardApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className='summary'>
      <h2>Stock prices App</h2>
      <p > Stock price web app that uses Alpha Vantage as Stock Quote provider.
      User provides a stock symbol to see the price of the stock plotted on a chart.
      The time period shown in the chart is customizable.
      Users should be able to overlay an average on the chart.</p>
    </div>
  );
}




export default App;
