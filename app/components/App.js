// const React = require("react");
// const Popular = require("./Popular");
// const ReactRouter = require("react-router-dom");
// const Router = ReactRouter.BrowserRouter;
// const Route = ReactRouter.Route;
// const Nav = require("./Nav");
// const Home = require("./Home");
// const Battle = require("./Battle");
// const Switch = ReactRouter.Switch;
// const Results = require("./Results");

import React from "react";
import Popular from "./Popular";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route path="/battle/results" component={Results} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
