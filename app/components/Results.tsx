import * as React from "react";
import * as queryString from "query-string";
import { default as api } from "../utils/api";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";
import Profile from "./Profile";
import Loading from "./Loading";

interface PlayerProps {
  label: string;
  score: number;
  profile: object;
}

interface ProfileObj {
  avatar_url: string;
  login: string;
}

function Player(props: PlayerProps) {
  return (
    <div>
      <h1 className="header">{props.label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {props.score}</h3>
      <PlayerPreview
        avatar={(props.profile as ProfileObj).avatar_url}
        username={(props.profile as ProfileObj).login}
      >
        <Profile {...props} />
      </PlayerPreview>
    </div>
  );
}

interface ResultsProps {
  location: any;
}

interface ResultsState {
  winner: any;
  loser: any;
  error: null | string;
  loading: boolean;
}

interface PlayersObject {
  playerOneName: string;
  playerTwoName: string;
}

class Results extends React.Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const players: PlayersObject = queryString.parse(
      this.props.location.search
    );

    api
      .battle([players.playerOneName, players.playerTwoName])
      .then((results: any) => {
        if (results === null) {
          return this.setState({
            error:
              "Looks like there was an error.  Check that both users exist on github.",
            loading: false
          });
        }
        console.log("Results after api call finished:  ", results);
        //received correct response so update state
        this.setState({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        });
      });
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading) {
      return <Loading text="Loading" />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
      </div>
    );
  }
}

export default Results;
