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
    let movieId = bestVoted.id;
    let movie = new MovieElement(
      title,
      overview,
      average,
      releaseDate,
      backdropPath,
      posterPath,
      movieId
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
      let movieId = movieData.results[key].id;
      let movie = new MovieElement(
        title,
        overview,
        average,
        releaseDate,
        backdropPath,
        posterPath,
        movieId
      );
      let context = this;
      DiscoverActions.addMovieToStore(movie, context);
    }
  },
  successDetails: function (data) {
    let movieData;
    movieData = JSON.parse(data);
    let genre = [];
    for (var key in movieData.genres) {
      genre.push(' ' + movieData.genres[key].name);
    }
    let posterPath = movies.createImageUrl(movieData.poster_path);
    let movie = new MovieDetails(
      movieData.original_title,
      movieData.overview,
      genre,
      movieData.release_date,
      movieData.runtime,
      movieData.vote_average,
      movieData.vote_count,
      movieData.homepage,
      posterPath
    );
    let context = this;
    MovieDetailsActions.addMovieData(movie, context);
  },
  successDetailsCredits: function (data) {
    let movieData;
    movieData = JSON.parse(data);
    let credits = [];
    let cast = movieData.cast;
    let castCounter = 0;
    for (let key in cast) {
      if (castCounter < 6) {
        castCounter++;
        let actor = {};
        actor.name = cast[key].name;
        actor.character = cast[key].character;
        actor.picture = movies.createImageUrl(cast[key].profile_path);
        credits.push(actor);
      } else {
        break;
      }
    }

    let crews = [];
    let crewCounter = 0;
    let crew = movieData.crew;
    for (let key in crew) {
      if (crewCounter < 4) {
        crewCounter++;
        let crewMember = {};
        crewMember.job = crew[key].job;
        crewMember.name = crew[key].name;
        crews.push(crewMember);
      } else {
        break;
      }
    }

    let context = this;
    MovieDetailsActions.addCreditsData(credits, crews, context);
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
