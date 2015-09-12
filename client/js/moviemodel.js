/* jshint esnext: true */

class MovieElement {
  constructor (title, overview, rating, publishDate, backdropPath, posterPath) {
    this.title = title;
    this.description = overview;
    this.rating = rating;
    this.year = publishDate;
    this.backdrop = backdropPath;
    this.poster = posterPath;
  }
}

let movies = {
  getMaxVotedElement: function (moviesResult) {
    let result = moviesResult.results;
    let maxVoted;
    let voteCount = 0;
    for (var key in result) {
      let item = result[key];
      if ((item !== null) && (item.hasOwnProperty('vote_count'))) {
        if (parseInt(item.vote_count, 10) > voteCount) {
          voteCount = item.vote_count;
          maxVoted = item;
        }
      }
    }
    return maxVoted;
  },
  createImageUrl: function (endOfTheUrl) {
    if (typeof(endOfTheUrl) === 'string') {
      let url = 'http://image.tmdb.org/t/p/w500' + endOfTheUrl;
      return url;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  createMovieUrl: function (movieTitle) {
    if (typeof(movieTitle) === 'string') {
      let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
      let urlFirstPart = 'https://api.themoviedb.org/3/search/movie?query=';
      let url = urlFirstPart + movieTitle + api_key;
      return url;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  modifyOverview: function (overview) {
    if (typeof(overview) === 'string') {
      let originalOverview = overview;
      let newOverview;
      if (originalOverview.length > 130) {
        newOverview = originalOverview.substr(0, 130) + '...';
        return newOverview;
      } else {
        return originalOverview;
      }
    } else {
      throw new Error('Input type is not string!');
    }

  },
  modifyReleaseDate: function (releaseDate) {
    if (typeof(releaseDate) === 'string') {
      let originalReleaseDate = releaseDate;
      let newReleaseDate = originalReleaseDate.substr(0, 4) + ' ';
      return newReleaseDate;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  modifyTitle: function (title) {
    if (typeof(title) === 'string') {
      let originalTitle = title;
      let newTitle = originalTitle.substr(0, 20);
      return newTitle;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  create1MonthDiscoverUrl: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = '01';
    let insertableDate = year + '-' + month + '-' + day;
    let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    let urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' +
                        insertableDate + '&sort_by=popularity.desc&';
    let url = urlFirstPart + api_key;
    return url;
  },
  create3MonthDiscoverUrl: function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() - 2;
    let day = '01';
    let insertableDate = year + '-' + month + '-' + day;
    let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    let urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' +
                        insertableDate + '&sort_by=vote_count.desc&';
    let url = urlFirstPart + api_key;
    return url;
  }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = movies;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return movies;
    });
  } else {
    window.movies = movies;
  }
}
