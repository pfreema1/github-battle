const React = require("react");
const Link = require("react-router-dom").Link;

class Home extends React.Component<any, any> {


  render() {
    return(
      <div className="home-container">
        <h1>Pew pew</h1>

        <Link className="button" to="/battle">Battle</Link>
      </div>
    );
  }
}

module.exports = Home;