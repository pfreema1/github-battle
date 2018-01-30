let params: string = "";

function getProfile(username: PlayerObject): Promise<any> {
  return fetch("https://api.github.com/users/" + username + params, {
    method: "get",
    mode: "cors"
  }).then((user: any) => {
    return user.data;
  });
}

function getRepos(username: PlayerObject): Promise<any> {
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

interface ReposObject {
  data: any;
  stargazers_count: number;
}

function getStarCount(repos: ReposObject): number {
  return repos.data.reduce((prevVal: number, elem: object) => {
    return prevVal + (elem as ReposObject).stargazers_count;
  }, 0);
}

interface ProfileObject {
  followers: number;
}

function calculateScore(profile: ProfileObject, repos: ReposObject): number {
  let followers: number = profile.followers;
  let totalStars: number = getStarCount(repos);

  return followers * 3 + totalStars;
}

function handleError(error: string) {
  console.warn(error);
  return null;
}

interface UserData {
  [index: number]: ProfileObject | ReposObject;
}

function getUserData(player: PlayerObject): Promise<object> {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    (data: UserData) => {
      let profile = data[0];
      let repos = data[1];

      return {
        profile: profile,
        score: calculateScore(profile as ProfileObject, repos as ReposObject)
      };
    }
  );
}

interface PlayerObject {
  score: number;
}

function sortPlayers(players: PlayerObject[]): PlayerObject[] {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

let api = {
  battle: function(players: PlayerObject[]) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },

  fetchPopularRepos: (language: string) => {
    let encodedURI = (window as any).encodeURI(
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
