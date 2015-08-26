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
}

let movies = {
  getMaxVotedElement: function(moviesResult) {
    let result = moviesResult.results;
    let maxVoted;
    let voteCount = 0;
    for (var key in result) {
      let item = result[key];
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
    let url = "http://image.tmdb.org/t/p/w500" + endOfTheUrl;
    return url;
  },
  createMovieUrl: function(movieTitle) {
    let api_key = "&api_key=4a8dce0b18b88827ffbc32dee5b66838";
    let urlFirstPart = "https://api.themoviedb.org/3/search/movie?query=";
    let url = urlFirstPart + movieTitle + api_key;
    return url;
  },
  modifyOverview: function(overview) {
    let originalOverview = overview;
    let newOverview;
    if(originalOverview.length > 150) {
      newOverview = originalOverview.substr(0,130) + "...";
      return newOverview;
    }
    else {
      return originalOverview;
    }
  },
  modifyReleaseDate: function(releaseDate) {
    let originalReleaseDate = releaseDate;
    let newReleaseDate = originalReleaseDate.substr(0,4);
    return newReleaseDate;
  },
  modifyTitle: function (title) {
    let originalTitle = title;
    let newTitle = originalTitle.substr(0,22);
    return newTitle;
  }
};
