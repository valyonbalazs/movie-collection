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
      get: function (args) {
        return core.ajax('GET', url, args);
      }
    };
  },
  success: function (data) {
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
    let context = this;
    MyMoviesActions.addMovieToMyList(movie, context);
  },
  successDiscover: function (data) {
    let movieData;
    movieData = JSON.parse(data);

    for (let key in movieData.results) {
      let title = movies.modifyTitle(movieData.results[key].title);
      let backdropPath = movies.createImageUrl(movieData.results[key].backdrop_path);
      let posterPath = movies.createImageUrl(movieData.results[key].poster_path);
      let overview = movies.modifyOverview(movieData.results[key].overview);
      let releaseDate = movies.modifyReleaseDate(movieData.results[key].release_date);
      let average = movieData.results[key].vote_average + ' ';
      let movie = new MovieElement(
        title,
        overview,
        average,
        releaseDate,
        backdropPath,
        posterPath
      );
      let context = this;
      DiscoverActions.addMovieToStore(movie, context);
    }
  }
};

// module.exports for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = http;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return http;
    });
  } else {
    window.http = http;
  }
}
