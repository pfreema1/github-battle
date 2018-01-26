

module.exports = {
  fetchPopularRepos: (language) => {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return fetch(encodedURI, {
      method: "get",
      mode: "cors"
    }).then((res) => {
      // console.log(res);
      return res.json();
    }).then((res) => {
      // console.log(res);
      return res.items;
    });
  }
}