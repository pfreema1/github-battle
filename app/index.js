let React = require("react");
let ReactDOM = require("react-dom");
require("./index.css");

class App extends React.Component {
  render() {
    return (
      <div>
        Hi there!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);