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
    homePage
  ) {
    this.title = title;
    this.overview = overview;
    this.publishDate = publishDate;
    this.runTime = runTime;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.homePage = homePage;
  }
}

let movieDetails = {
  createMovieUrl: function (id) {
    if (typeof(id) === 'string') {
      let api_key = '?' + tmdbApiKey;
      let urlFirstPart = 'https://api.themoviedb.org/3/movie/';
      let url = urlFirstPart + id + api_key;
      return url;
    } else {
      throw new Error('Input type is not string!');
    }
  }
};
