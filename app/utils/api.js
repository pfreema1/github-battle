// let id = "YOUR_CLIENT_ID";
// let sec = "YOUR_SECRED_ID";
// let params = "?client_id=" + id + "&client_secred=" + sec;
let params = "";

function getProfile(username) {
  return fetch("https://api.github.com/users/" + username + params, {
    method: "get",
    mode: "cors"
  }).then(user => {
    return user.data;
  });
}

function getRepos(username) {
  return fetch(
    "https://api.github.com/users/" +
      username +
      "/repos" +
      params +
      "&per_page=100",
    {
      method: "get",
      mode: "cors"
    }
  );
}

function getStarCount(repos) {
  return repos.data.reduce((prevVal, elem) => {
    return prevVal + elem.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(data => {
    let profile = data[0];
    let repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

let api = {
  battle: function(players) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: language => {
    let encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );

    return fetch(encodedURI, {
      method: "get",
      mode: "cors"
    })
      .then(res => {
        // console.log(res);
        return res.json();
      })
      .then(res => {
        // console.log(res);
        return res.items;
      });
  }
};

export default api;
