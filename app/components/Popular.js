// const React = require("react");
// const PropTypes = require("prop-types");
// const api = require("../utils/api");

import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";

/* STATELESS FUNCTIONAL COMPONENT */
function SelectLanguage(props) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="languages">
      {languages.map(elem => {
        return (
          <li
            style={
              elem === props.selectedLanguage ? { color: "#d0021b" } : null
            }
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

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <li key={repo} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={"Avatar for " + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  constructor(props) {
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

  updateLanguage(lang) {
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
          <RepoGrid repos={this.state.repos} />
        ) : (
          <p>LOADING</p>
        )}
      </div>
    );
  }
}

export default Popular;
