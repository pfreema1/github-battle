const React = require("react");
const Popular = require("./Popular");
const ReactRouter = require("react-router-dom");
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}

module.exports = App;