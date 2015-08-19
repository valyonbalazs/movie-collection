/*jshint esnext: true */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieElement = (function () {
  function MovieElement(title, overview, rating, publishDate, backdropPath, posterPath) {
    _classCallCheck(this, MovieElement);

    this.title = title;
    this.description = overview;
    this.rating = rating;
    this.year = publishDate;
    this.backdrop = backdropPath;
    this.poster = posterPath;
  }

  _createClass(MovieElement, [{
    key: "getTitle",
    value: function getTitle() {
      return this.title;
    }
  }, {
    key: "getOverview",
    value: function getOverview() {
      return this.overview;
    }
  }, {
    key: "getRating",
    value: function getRating() {
      return this.rating;
    }
  }, {
    key: "getPublishDate",
    value: function getPublishDate() {
      return this.publishDate;
    }
  }, {
    key: "getBackdropPath",
    value: function getBackdropPath() {
      return this.backdropPath;
    }
  }, {
    key: "getPosterPath",
    value: function getPosterPath() {
      return this.posterPath;
    }
  }]);

  return MovieElement;
})();

var movies = {
  getMaxVotedElement: function getMaxVotedElement(moviesResult) {
    var result = moviesResult.results;
    var maxVoted;
    var voteCount = 0;
    for (var key in result) {
      var item = result[key];
      if (item !== null && item.hasOwnProperty("vote_count")) {
        if (parseInt(item.vote_count) > voteCount) {
          voteCount = item.vote_count;
          maxVoted = item;
        }
      }
    }
    return maxVoted;
  },
  createImageUrl: function createImageUrl(endOfTheUrl) {
    var url = "http://image.tmdb.org/t/p/w500" + endOfTheUrl;
    return url;
  },
  createMovieUrl: function createMovieUrl(movieTitle) {
    var api_key = "&api_key=4a8dce0b18b88827ffbc32dee5b66838";
    var urlFirstPart = "https://api.themoviedb.org/3/search/movie?query=";
    var url = urlFirstPart + movieTitle + api_key;
    return url;
  },
  modifyOverview: function modifyOverview(overview) {
    var originalOverview = overview;
    var newOverview;
    if (originalOverview.length > 150) {
      newOverview = originalOverview.substr(0, 130) + "...";
      return newOverview;
    } else {
      return originalOverview;
    }
  },
  modifyReleaseDate: function modifyReleaseDate(releaseDate) {
    var originalReleaseDate = releaseDate;
    var newReleaseDate = originalReleaseDate.substr(0, 4);
    return newReleaseDate;
  },
  modifyTitle: function modifyTitle(title) {
    var originalTitle = title;
    var newTitle = originalTitle.substr(0, 22);
    return newTitle;
  }
};
"use strict";

var starterMovieTitles = [{ title: "blade runner" }, { title: "avengers" }, { title: "batman" }, { title: "star wars episode iv" }, { title: "star wars episode iii" }, { title: "schindler's list" }, { title: "gladiator" }, { title: "men in black" }, { title: "django" }, { title: "alien" }, { title: "predator" }, { title: "jurassic park" }];
/*var starterMovieTitles = [
  {title: "blade runner"}
];*/

var movieListData = [];

var Poster = React.createClass({ displayName: "Poster",
  render: function render() {
    var posterPath = this.props.path;
    return React.createElement("div", { className: "col-lg-2 col-md-2 col-xs-3 poster" }, React.createElement("img", { src: posterPath }));
  }
});

var Title = React.createClass({ displayName: "Title",
  render: function render() {
    return React.createElement("h3", { className: "title" }, this.props.title);
  }
});

var Description = React.createClass({ displayName: "Description",
  render: function render() {
    return React.createElement("h5", { className: "description" }, this.props.description);
  }
});

var TextContainer = React.createClass({ displayName: "TextContainer",
  render: function render() {
    var title = this.props.data.title;
    var description = this.props.data.description;
    return React.createElement("div", { className: "col-lg-8 col-md-8 col-xs-9 textContainer" }, React.createElement(Title, { title: title }), React.createElement(Description, { description: description }));
  }
});

var Rating = React.createClass({ displayName: "Rating",
  render: function render() {
    return React.createElement("h3", { className: "rating" }, this.props.rating, React.createElement("i", { className: "fa fa-star" }));
  }
});

var PublishYear = React.createClass({ displayName: "PublishYear",
  render: function render() {
    return React.createElement("h3", { className: "publishYear" }, this.props.year, React.createElement("i", { className: "fa fa-calendar" }));
  }
});

var RatingYearContainer = React.createClass({ displayName: "RatingYearContainer",
  render: function render() {
    return React.createElement("div", { className: "col-lg-2 col-md-2 col-xs-3 ratingYearContainer" }, React.createElement(Rating, { rating: this.props.rating }), React.createElement(PublishYear, { year: this.props.year }));
  }
});

var DetailsContainer = React.createClass({ displayName: "DetailsContainer",
  render: function render() {
    var movieData = this.props.data;
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-xs-12 detailsContainer" }, React.createElement(Poster, { path: movieData.poster }), React.createElement(TextContainer, { data: movieData }), React.createElement(RatingYearContainer, { rating: movieData.rating, year: movieData.year }));
  }
});

var Backdrop = React.createClass({ displayName: "Backdrop",
  render: function render() {
    var backdropPath = this.props.backdrop;
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-xs-12 backdrop" }, React.createElement("img", { src: backdropPath }));
  }
});

var Movie = React.createClass({ displayName: "Movie",
  render: function render() {
    return React.createElement("div", { className: "col-lg-4 col-md-6 col-xs-12 movie" }, React.createElement(Backdrop, { backdrop: this.props.movie.backdrop }), React.createElement(DetailsContainer, { data: this.props.movie }));
  }
});

var MoviesContainer = React.createClass({ displayName: "MoviesContainer",
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.loadMovies();
  },
  loadMovies: function loadMovies() {
    movieListData = [];
    for (var key in starterMovieTitles) {
      var title = starterMovieTitles[key].title;
      this.ajax(movies.createMovieUrl(title)).get().then(this.success);
    }
  },
  ajax: function ajax(url) {
    var core = {
      ajax: function ajax(method, url, args) {
        var promise = new Promise(function (resolve, reject) {
          var client = new XMLHttpRequest();
          var uri = url;
          if (method === "GET") {
            client.open(method, uri);
            client.send();
            client.onload = function () {
              if (this.status == 200) {
                resolve(this.response);
              } else {
                reject(this.statusText);
              }
            };
            client.onerror = function () {
              reject(this.statusText);
            };
          }
        });
        return promise;
      }
    };

    return {
      'get': function get(args) {
        return core.ajax('GET', url, args);
      }
    };
  },
  success: function success(data) {
    var movieData;
    movieData = JSON.parse(data);
    var bestVoted = movies.getMaxVotedElement(movieData);
    var title = movies.modifyTitle(bestVoted.title);
    var backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    var posterPath = movies.createImageUrl(bestVoted.poster_path);
    var overview = movies.modifyOverview(bestVoted.overview);
    var releaseDate = movies.modifyReleaseDate(bestVoted.release_date);
    var movie = new MovieElement(title, overview, bestVoted.vote_average, releaseDate, backdropPath, posterPath);
    movieListData.push(movie);
    this.setState({ data: movieListData });
  },
  render: function render() {
    console.log(this.state.data);
    var moviesArray = this.state.data.map(function (movie) {
      return React.createElement(Movie, { movie: movie });
    });

    return React.createElement("div", { className: "col-lg-12 col-md-12 col-xs-12 moviesContainer" }, moviesArray);
  }
});

React.render(React.createElement(MoviesContainer, null), document.getElementById("innerContainer"));
'use strict';

var menuItems = [{ 'item': 'link1' }, { 'item': 'link2' }, { 'item': 'link3' }];

var MenuItem = React.createClass({ displayName: "MenuItem",
  render: function render() {
    return React.createElement("li", null, this.props.menuItem);
  }
});

var Navbar = React.createClass({ displayName: "Navbar",
  getInitialState: function getInitialState() {
    return { data: menuItems };
  },
  render: function render() {
    var menuItemArray = this.state.data.map(function (item) {
      return React.createElement(MenuItem, { menuItem: item });
    });

    return React.createElement("ul", { className: "nav" }, menuItemArray);
  }
});

React.render(React.createElement(Navbar, null), document.getElementById("navBar"));