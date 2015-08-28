/* jshint esnext: true */

let http = {
  ajax: function(url) {
    let core = {
      ajax: function(method, url, args) {
        let promise = new Promise(function(resolve, reject) {
          let client = new XMLHttpRequest();
          let uri = url;
          if (method === 'GET') {
            client.open(method, uri);
            client.send();
            client.onload = function() {
              if (this.status == 200) {
                resolve(this.response);
              } else {
                reject(this.statusText);
              }
            };
            client.onerror = function() {
              reject(this.statusText);
            };
          }
        });
        return promise;
      }
    };

    return {
      get: function(args) {
        return core.ajax('GET', url, args);
      }
    };
  },
  success: function(data) {
    let movieData;
    movieData = JSON.parse(data);
    let bestVoted = movies.getMaxVotedElement(movieData);
    let title = movies.modifyTitle(bestVoted.title);
    let backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    let posterPath = movies.createImageUrl(bestVoted.poster_path);
    let overview = movies.modifyOverview(bestVoted.overview);
    let releaseDate = movies.modifyReleaseDate(bestVoted.release_date);
    let average = bestVoted.vote_average + ' ';
    let movie = new MovieElement(
      title,
      overview,
      average,
      releaseDate,
      backdropPath,
      posterPath
    );
    movieListData.push(movie);

    // React container update
    this.setState({data: movieListData});
  }
};
