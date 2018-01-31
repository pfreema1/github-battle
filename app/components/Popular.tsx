import * as React from "react";
import api from "../utils/api";
import Loading from "./Loading";

interface SelectLanguageProps {
  selectedLanguage: string;
  onSelect(lang: string): void;
}

/* STATELESS FUNCTIONAL COMPONENT */
function SelectLanguage(props: SelectLanguageProps) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(elem => {
        return (
          <li
            style={elem === props.selectedLanguage ? { color: "#d0021b" } : {}}
            key={elem}
            onClick={props.onSelect.bind(null, elem)}
          >
            {elem}
          </li>
        );
      })}
    </ul>
  );
}

interface RepoGridProps {
  repos: RepoObject[];
}

interface RepoObject {
  owner: object;
  name: string;
  html_url: string;
  stargazers_count: string;
}

interface RepoOwnerObject {
  login: string;
  avatar_url: string;
}

function RepoGrid(props: RepoGridProps) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo: RepoObject, index: number) => {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={(repo.owner as RepoOwnerObject).avatar_url}
                  alt={"Avatar for " + (repo.owner as RepoOwnerObject).login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{(repo.owner as RepoOwnerObject).login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

interface PopularProps {}

interface PopularState {
  selectedLanguage: string;
  repos: object | null;
}

class Popular extends React.Component<PopularProps, PopularState> {
  constructor(props: PopularProps) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang: string) {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang).then(repos => {
      console.log(repos);
      this.setState({
        repos: repos
      });
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          onSelect={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {this.state.repos ? (
          <RepoGrid repos={this.state.repos as RepoObject[]} />
        ) : (
          <Loading text="Loading" />
        )}
      </div>
    );
  }
}

export default Popular;
