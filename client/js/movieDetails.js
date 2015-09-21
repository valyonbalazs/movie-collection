/* jshint esnext: true */

class MovieDetails {
  constructor(
    title,
    overview,
    genre,
    publishDate,
    runTime,
    vote_average,
    vote_count,
    homePage,
    posterPath
  ) {
    this.title = title;
    this.overview = overview;
    this.genre = genre;
    this.publishDate = publishDate;
    this.runTime = runTime;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.homePage = homePage;
    this.posterPath = posterPath;
  }
}

let movieDetails = {
  createMovieUrl: function (id) {
    let api_key = '?' + tmdbApiKey;
    let urlFirstPart = 'https://api.themoviedb.org/3/movie/';
    let url = urlFirstPart + id + api_key;
    return url;
  },
  createCreditsUrl: function (id) {
    let api_key = '?' + tmdbApiKey;
    let urlSecondPart = '/credits';
    let urlFirstPart = 'https://api.themoviedb.org/3/movie/';
    let url = urlFirstPart + id + urlSecondPart + api_key;
    return url;
  }
};
