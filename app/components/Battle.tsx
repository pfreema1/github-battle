// this is only here for TS - it lets the compiler know that
// this file should be treated as a module  
export {};  

const React = require("react");
const PropTypes = require("prop-types");
const Link = require("react-router-dom").Link;

//is this doing anything?**************************
interface PlayerPreviewProps {
  avatar: string,
  username: string,
  id: string,
  onReset(id: string): void 
}



function PlayerPreview(props: PlayerPreviewProps) {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={"Avatar for " + props.username}
        />
        <h2 className="username">@{props.username}</h2>

      </div>
      <button 
        className="reset"
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
      
        
    </div>
  );

}



//not doing anything?**************************

interface PlayerInputProps {
  id: string,
  label: string,
  onSubmit(id: string, username: string): void
}

interface PlayerInputState {
  username: string 
}



class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {

  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;

    this.setState(function() {
      return {
        username: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button 
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit
        </button>

      </form>
    );
  }
}






class Battle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName:  "",
      playerOneImage: null,
      playerTwoImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function () {
      let newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = "https://github.com/" + username + ".png?size=200";

      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      let newState = {};
      newState[id + "Name"] = "";
      newState[id + "Image"] = null;

      return newState;
    });
  }

  render() {

    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput 
              id="playerOne"
              label="Player Two"
              onSubmit={this.handleSubmit}
          />}

          {playerOneImage !== null && 
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id="playerOne"  
            />}

          {!playerTwoName &&
            <PlayerInput 
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
          />}

          {playerTwoImage !== null && 
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id="playerTwo"  
          />}

        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className="button"
            to={{
              pathname: match.url + "/results",
              search: `?playerOneName=` + playerOneName + "&playerTwoName=" + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    );
  }
}

module.exports = Battle;