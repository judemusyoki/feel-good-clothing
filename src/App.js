import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Homepage from "./pages/homepage/homepage.component";

function App() {
  return (
    <div>
      {/* <Homepage /> */}
      <Header />
      <Switch>  {/* Renders the first correct matched path*/}
        <Route exact path='/' component={Homepage} /> {/* Exact renders only the homepage */}
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
