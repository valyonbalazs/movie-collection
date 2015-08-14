/*jshint esnext: true */

class MovieElement {
  constructor(title, overview, rating, publishDate, backdropPath, posterPath) {
    this.title = title;
    this.description = overview;
    this.rating = rating;
    this.year = publishDate;
    this.backdrop = backdropPath;
    this.poster = posterPath;
  }

  getTitle() {
    return this.title;
  }

  getOverview() {
    return this.overview;
  }

  getRating() {
    return this.rating;
  }

  getPublishDate() {
    return this.publishDate;
  }

  getBackdropPath() {
    return this.backdropPath;
  }

  getPosterPath() {
    return this.posterPath;
  }
}

var movies = {
  getMaxVotedElement: function(moviesResult) {
    var result = moviesResult.results;
    var maxVoted;
    var voteCount = 0;
    for (var key in result) {
      var item = result[key];
      if ((item !== null) && (item.hasOwnProperty("vote_count"))) {
        if (parseInt(item.vote_count) > voteCount) {
          voteCount = item.vote_count;
          maxVoted = item;
        }
      }
    }
    return maxVoted;
  },
  createImageUrl: function(endOfTheUrl) {
    var url = "http://image.tmdb.org/t/p/w500" + endOfTheUrl;
    return url;
  },
  createMovieUrl: function(movieTitle) {
    var api_key = "&api_key=4a8dce0b18b88827ffbc32dee5b66838";
    var urlFirstPart = "https://api.themoviedb.org/3/search/movie?query=";
    var url = urlFirstPart + movieTitle + api_key;
    return url;
  }
};
