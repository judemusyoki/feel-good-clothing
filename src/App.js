import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/homepage/homepage.component";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      {/* <Homepage /> */}
      <Switch>  {/* Renders the first correct matched path*/}
        <Route exact path='/' component={Homepage} /> {/* Exact renders only the homepage */}
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
