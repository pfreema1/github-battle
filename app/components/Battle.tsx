import * as React from "react";
import { Link } from "react-router-dom";

interface PlayerPreviewProps {
  avatar: string;
  username: string;
  id: string;
  onReset(id: string): void;
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
      <button className="reset" onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  );
}

interface PlayerInputProps {
  id: string;
  label: string;
  onSubmit(id: string, username: string): void;
}

interface PlayerInputState {
  username: string;
}

class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
  constructor(props: PlayerInputProps) {
    super(props);

    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    let value = (event.target as HTMLInputElement).value;

    this.setState(function() {
      return {
        username: value
      };
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
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
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

interface BattleProps {
  match: object;
  // match[url]: string;
}

interface MatchObj {
  [index: string]: string;
}

interface BattleState {
  playerOneName: string;
  playerTwoName: string;
  playerOneImage: string;
  playerTwoImage: string;
}

class Battle extends React.Component<BattleProps, BattleState> {
  constructor(props: BattleProps) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: "",
      playerTwoImage: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id: string, username: string) {
    this.setState(function() {
      let newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200";

      return newState;
    });
  }

  handleReset(id: string) {
    this.setState(function() {
      let newState = {};
      newState[id + "Name"] = "";
      newState[id + "Image"] = "";

      return newState;
    });
  }

  render() {
    const match: MatchObj = this.props.match as MatchObj;
    const playerOneName: string = this.state.playerOneName;
    const playerTwoName: string = this.state.playerTwoName;
    const playerOneImage: string = this.state.playerOneImage;
    const playerTwoImage: string = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage !== "" && (
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id="playerOne"
            />
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage !== "" && (
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id="playerTwo"
            />
          )}
        </div>

        {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button"
              to={{
                pathname: match.url + "/results",
                search:
                  `?playerOneName=` +
                  playerOneName +
                  "&playerTwoName=" +
                  playerTwoName
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

export default Battle;
