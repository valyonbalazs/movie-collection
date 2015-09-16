/* jshint esnext: true */

'use strict';

var http = {
  ajax: function ajax(url) {
    var core = {
      ajax: function ajax(method, url, args) {
        var promise = new Promise(function (resolve, reject) {
          var client = new XMLHttpRequest();
          var uri = url;
          if (method === 'GET') {
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
      get: function get(args) {
        return core.ajax('GET', url, args);
      }
    };
  },
  success: function success(data) {
    var movieData = undefined;
    movieData = JSON.parse(data);
    var bestVoted = movies.getMaxVotedElement(movieData);
    var title = movies.modifyTitle(bestVoted.title);
    var backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    var posterPath = movies.createImageUrl(bestVoted.poster_path);
    var overview = movies.modifyOverview(bestVoted.overview);
    var releaseDate = movies.modifyReleaseDate(bestVoted.release_date);
    var average = bestVoted.vote_average + ' ';
    var movie = new MovieElement(title, overview, average, releaseDate, backdropPath, posterPath);
    var context = this;
    MyMoviesActions.addMovieToMyList(movie, context);
  },
  successDiscover: function successDiscover(data) {
    var movieData = undefined;
    movieData = JSON.parse(data);

    for (var key in movieData.results) {
      var title = movies.modifyTitle(movieData.results[key].title);
      var backdropPath = movies.createImageUrl(movieData.results[key].backdrop_path);
      var posterPath = movies.createImageUrl(movieData.results[key].poster_path);
      var overview = movies.modifyOverview(movieData.results[key].overview);
      var releaseDate = movies.modifyReleaseDate(movieData.results[key].release_date);
      var average = movieData.results[key].vote_average + ' ';
      var movie = new MovieElement(title, overview, average, releaseDate, backdropPath, posterPath);
      var context = this;
      DiscoverActions.addMovieToStore(movie, context);
    }
  }
};

// module.exports for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = http;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return http;
    });
  } else {
    window.http = http;
  }
}
/* jshint esnext: true */

// Making the User a Singleton object
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var userInstance = null;

var User = function User(username, email, profilPicUrl) {
  _classCallCheck(this, User);

  if (!userInstance) {
    this.UserName = username;
    this.Email = email;
    this.ProfilePicUrl = profilPicUrl;
    userInstance = this;
  }

  return userInstance;
};

var ref = new Firebase('https://brilliant-inferno-2926.firebaseio.com');
var login = {
  saveUserTokenToLocalStorage: function saveUserTokenToLocalStorage(uid) {
    localStorage.uid = uid;
  },
  saveUserDataToLocalStorage: function saveUserDataToLocalStorage(name, email, imageUrl) {
    localStorage.userName = name;
    localStorage.userEmail = email;
    localStorage.imageUrl = imageUrl;
  },
  loginBtnClick: function loginBtnClick() {
    ref.authWithOAuthPopup('facebook', function (error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        var facebookLoginData = authData.facebook;
        var userName = facebookLoginData.displayName;
        var userEmail = facebookLoginData.email;
        var userProfilePicUrl = facebookLoginData.profileImageURL;
        var user = new User(userName, userEmail, userProfilePicUrl);
        ref.child('users').child(authData.uid).set({
          provider: authData.provider,
          name: authData.facebook.displayName
        });
        login.saveUserTokenToLocalStorage(authData.uid);
        login.saveUserDataToLocalStorage(userName, userEmail, userProfilePicUrl);
        renderPage.removeLoginpage();
        renderPage.renderDiscoverPage();
      }
    }, {
      remember: 'sessionOnly',
      scope: 'email,user_likes'
    });
  },
  getName: function getName() {
    switch (authData.provider) {
      case 'password':
        {
          return authData.password.email.replace(/@.*/, '');
        }
      case 'twitter':
        {
          return authData.twitter.displayName;
        }
      case 'facebook':
        {
          return authData.facebook.displayName;
        }
    }
  }
};
/* jshint esnext: true */

"use strict";

var movieListData = [];

var ownMovieTitleList = [];

//let discoverMovies = [];
/* jshint esnext: true */

// needed for Karma testing, ES6 tests only works with this
//'use strict';

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MovieElement = function MovieElement(title, overview, rating, publishDate, backdropPath, posterPath) {
  _classCallCheck(this, MovieElement);

  this.title = title;
  this.description = overview;
  this.rating = rating;
  this.year = publishDate;
  this.backdrop = backdropPath;
  this.poster = posterPath;
};

var tmdbApiKey = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';

var movies = {
  getMaxVotedElement: function getMaxVotedElement(moviesResult) {
    var result = moviesResult.results;
    var maxVoted = undefined;
    var voteCount = 0;
    for (var key in result) {
      var item = result[key];
      if (item !== null && item.hasOwnProperty('vote_count')) {
        if (parseInt(item.vote_count, 10) > voteCount) {
          voteCount = item.vote_count;
          maxVoted = item;
        }
      }
    }
    return maxVoted;
  },
  createImageUrl: function createImageUrl(endOfTheUrl) {
    if (typeof endOfTheUrl === 'string') {
      var url = 'http://image.tmdb.org/t/p/w500' + endOfTheUrl;
      return url;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  createMovieUrl: function createMovieUrl(movieTitle) {
    if (typeof movieTitle === 'string') {
      var api_key = tmdbApiKey;
      var urlFirstPart = 'https://api.themoviedb.org/3/search/movie?query=';
      var url = urlFirstPart + movieTitle + api_key;
      return url;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  modifyOverview: function modifyOverview(overview) {
    if (typeof overview === 'string') {
      var originalOverview = overview;
      var newOverview = undefined;
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
  modifyReleaseDate: function modifyReleaseDate(releaseDate) {
    if (typeof releaseDate === 'string') {
      var originalReleaseDate = releaseDate;
      var newReleaseDate = originalReleaseDate.substr(0, 4) + ' ';
      return newReleaseDate;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  modifyTitle: function modifyTitle(title) {
    if (typeof title === 'string') {
      var originalTitle = title;
      var newTitle = originalTitle.substr(0, 20);
      return newTitle;
    } else {
      throw new Error('Input type is not string!');
    }
  },
  create1MonthDiscoverUrl: function create1MonthDiscoverUrl() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = '01';
    var insertableDate = year + '-' + month + '-' + day;
    var api_key = tmdbApiKey;
    var urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' + insertableDate + '&sort_by=popularity.desc&';
    var url = urlFirstPart + api_key;
    return url;
  },
  create3MonthDiscoverUrl: function create3MonthDiscoverUrl() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() - 2;
    var day = '01';
    var insertableDate = year + '-' + month + '-' + day;
    var api_key = tmdbApiKey;
    var urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' + insertableDate + '&sort_by=vote_count.desc&';
    var url = urlFirstPart + api_key;
    return url;
  }
};

// module.exports for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = movies;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return movies;
    });
  } else {
    window.movies = movies;
  }
}
/* jshint esnext: true */

'use strict';

(function pageLoad() {

  if (localStorage.uid) {
    var user = new User(localStorage.userName, localStorage.userEmail, localStorage.imageUrl);
    document.addEventListener('DOMContentLoaded', function (event) {
      renderPage.removeLoginContainer();
      renderPage.renderMoviePage();
    });
  } else {
    document.addEventListener('DOMContentLoaded', function (event) {
      renderPage.removeDiscoverPage();
      renderPage.renderLoginPage();
    });
  }
})();
/* jshint esnext: true */

'use strict';

var DiscoverActions = Reflux.createActions(['addMovieToStore', 'oneMonthDiscoverBtnClicked', 'threeMonthDiscoverBtnClicked', 'removeContainer']);

var MyMoviesActions = Reflux.createActions(['loadMovieTitles', 'loadMovies', 'addMovieToMyList', 'removeMovieFromDb', 'addMovieToDb']);
/* jshint esnext: true */

'use strict';

var discoverActionStore = Reflux.createStore({
  discoverMovies: [],
  listenables: [DiscoverActions],
  init: function init() {},
  addMovieToStore: function addMovieToStore(item, context) {
    this.discoverMovies.push(item);
    context.setState({ data: this.discoverMovies });
  },
  removeContainer: function removeContainer() {
    var innerContainerChildren = document.getElementById('innerDiscoverContainer').children;
    if (innerContainerChildren[0] === undefined) {} else {
      var spanChildrenCount = innerContainerChildren[0].childNodes.length;
      var spanElement = innerContainerChildren[0];
      if (spanChildrenCount > 0) {
        while (spanElement.firstChild) {
          spanElement.removeChild(spanElement.firstChild);
        }
      }
    }
  },
  oneMonthDiscoverBtnClicked: function oneMonthDiscoverBtnClicked(that) {
    var context = that;
    this.btnClicked('Best movies of the last month', context, movies.create1MonthDiscoverUrl());
  },
  threeMonthDiscoverBtnClicked: function threeMonthDiscoverBtnClicked(that) {
    var context = that;
    this.btnClicked('Best movies of the last 3 months', context, movies.create3MonthDiscoverUrl());
  },
  btnClicked: function btnClicked(labelText, that, monthFunction) {
    var context = that;
    DiscoverActions.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = labelText;
    http.ajax(monthFunction).get().then(http.successDiscover.bind(context));
  }
});

var myMoviesActionStore = Reflux.createStore({
  indexTitleMap: new Map(),
  movieListData: [],
  ownMovieTitleList: [],
  keyTitleMap: new Map(),
  listenables: [MyMoviesActions],
  init: function init() {},
  loadMovieTitles: function loadMovieTitles(that) {
    var context = that;
    var promise = function promise() {
      return new Promise(function (resolve, reject) {
        var uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', (function (snapshot) {
          myMoviesActionStore.ownMovieTitleList = [];
          var data = snapshot.val();
          if (data === null) {} else {

            //Has to get the keys from the database for the adding-function
            //to create a non-existing key for the new element
            for (var i in data) {
              var values = data;
              myMoviesActionStore.indexTitleMap.set(i, values[i].title);
            }

            for (var j in data) {
              myMoviesActionStore.ownMovieTitleList.push(data[j].title);
            }
            this.setState({ data: myMoviesActionStore.ownMovieTitleList });
            resolve(function () {});
          }
        }).bind(context));
      });
    };

    promise().then((function () {
      this.setState({ data: myMoviesActionStore.ownMovieTitleList });
    }).bind(context));
  },
  loadMovies: function loadMovies(that) {
    var context = that;
    var wasItUsed = false;
    var promise = function promise() {
      return new Promise(function (resolve, reject) {
        var uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          myMoviesActionStore.ownMovieTitleList = [];
          myMoviesActionStore.movieListData = [];
          var data = snapshot.val();
          for (var i in data) {
            myMoviesActionStore.ownMovieTitleList.push(data[i].title);
          }
          if (wasItUsed === true) {
            myMoviesActionStore.movieListData = [];
            for (var key in myMoviesActionStore.ownMovieTitleList) {
              var title = myMoviesActionStore.ownMovieTitleList[key];
              http.ajax(movies.createMovieUrl(title)).get().then(http.success.bind(context));
            }
          }
          resolve(function () {});
        });
      });
    };

    promise().then(function () {
      wasItUsed = true;
      for (var key in myMoviesActionStore.ownMovieTitleList) {
        var title = myMoviesActionStore.ownMovieTitleList[key];
        http.ajax(movies.createMovieUrl(title)).get().then(http.success.bind(context));
      }
    });
  },
  addMovieToDb: function addMovieToDb(item) {
    var movieTitle = document.getElementById('addMovieTitleInputField').value;
    var uid = localStorage.getItem('uid');
    var biggestKey = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = indexTitleMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        if (parseInt(i[0]) > biggestKey) {
          biggestKey = i[0];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var convertToNumber = parseInt(biggestKey);
    var newBiggestKey = convertToNumber + 1;

    ref.child('movielist').child(uid).child('movies').child(newBiggestKey).set({
      title: movieTitle
    });
  },
  addMovieToMyList: function addMovieToMyList(item, context) {
    this.movieListData.push(item);
    context.setState({ data: this.movieListData });
  },
  removeMovieFromDb: function removeMovieFromDb(that) {
    var context = that;
    var uid = localStorage.getItem('uid');
    var title = context.props.title;
    ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
      var data = snapshot.val();
      for (var i in data) {
        var values = data;
        myMoviesActionStore.keyTitleMap.set(i, values[i].title);
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = myMoviesActionStore.keyTitleMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var j = _step2.value;

          if (title === j[1]) {
            console.log("title: " + title + " j: " + j[1]);
            ref.child('movielist').child(uid).child('movies').child(j[0]).remove();
            var indexOfElement = ownMovieTitleList.indexOf(j[1]);
            if (indexOfElement > -1) {
              ownMovieTitleList.splice(indexOfElement, 1);
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  }
});
/* jshint esnext: true */

'use strict';

var renderPage = {
  renderMoviePage: function renderMoviePage() {
    renderAllNavbar();
    //renderElements();
  },
  renderLoginPage: (function (_renderLoginPage) {
    function renderLoginPage() {
      return _renderLoginPage.apply(this, arguments);
    }

    renderLoginPage.toString = function () {
      return _renderLoginPage.toString();
    };

    return renderLoginPage;
  })(function () {
    renderLoginPage();
    window.onload = function () {
      var loginInnerDiv = document.getElementById('loginInnerDiv');
      loginInnerDiv.setAttribute('class', loginInnerDiv.getAttribute('class') + ' loaded');
    };
  }),
  renderDiscoverPage: function renderDiscoverPage() {
    renderDiscoverMovies();
  },
  removeDiscoverPage: function removeDiscoverPage() {
    var discoverBtns = document.getElementById('discoveryChooserContainer');
    var discoverParent = discoverBtns.parentNode;
    discoverParent.remove(discoverBtns);
  },
  removeLoginpage: function removeLoginpage() {
    React.unmountComponentAtNode(document.getElementById('loginContainer'));
    renderPage.removeLoginContainer();
    renderAllNavbar();
    //renderElements();
  },
  removeLoginContainer: function removeLoginContainer() {
    var logContainer = document.getElementById('loginContainer');
    var body = document.body;
    body.removeChild(logContainer);
  }
};
"use strict";

/* jshint esnext: true */
/* jshint esnext: true */

// for jsdom testing, it has to be uncommented during tests
/*let React = require('react/addons');
let http = require('../js/http.js');
let movies = require('../js/movieModel.js');*/

"use strict";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DiscoveryChooser = React.createClass({ displayName: "DiscoveryChooser",
  render: function render() {
    return React.createElement("div", { id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("h5", null, "A B C"));
  }
});

var DiscoverMoviesContainer = React.createClass({ displayName: "DiscoverMoviesContainer",
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.handleClick1();
  },
  handleClick1: function handleClick1() {
    var context = this;
    DiscoverActions.oneMonthDiscoverBtnClicked(context);
  },
  handleClick3: function handleClick3() {
    var context = this;
    DiscoverActions.threeMonthDiscoverBtnClicked(context);
  },
  render: function render() {
    var moviesArray = this.state.data.map(function (movie) {
      return React.createElement(Movie, { movie: movie });
    });

    return React.createElement("div", { id: "moviesContainer", className: "col-lg-12 col-md-12 col-xs-12 moviesContainer" }, React.createElement("div", { id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("div", { id: "discoveryChooserLabel", className: "col-lg-8 col-md-7 col-xs-12" }, React.createElement("h3", { id: "discoverLabel" }, "Label")), React.createElement("div", { id: "discoveryChooserButtons", className: "col-lg-5 col-md-5 col-xs-12" }, React.createElement("div", { className: "col-lg-5 col-md-6 col-xs-6 col-lg-offset-2" }, React.createElement("button", { id: "OneMonthButton", className: "btn btn-success", onClick: this.handleClick1 }, "LAST 1 MONTH")), React.createElement("div", { className: "col-lg-5 col-md-6 col-xs-6" }, React.createElement("button", { id: "ThreeMonthButton", className: "btn btn-warning", onClick: this.handleClick3 }, "LAST 3 MONTHS ")))), React.createElement("div", { id: "innerDiscoverContainer" }, React.createElement(ReactCSSTransitionGroup, { transitionName: "example" }, moviesArray)));
  }
});

function renderDiscoverMovies() {
  React.render(React.createElement(DiscoverMoviesContainer, null), document.getElementById('innerContainer'));
};

// module.exports for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = DiscoverMoviesContainer;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return DiscoverMoviesContainer;
    });
  } else {
    window.DiscoverMoviesContainer = DiscoverMoviesContainer;
  }
}
/* jshint esnext: true */

"use strict";

var Home = React.createClass({ displayName: "Home",
  render: function render() {
    return React.createElement("div", { id: "loginInnerDiv" }, React.createElement("h3", null, "Home"));
  }
});
/* jshint esnext: true */
"use strict";

var Login = React.createClass({ displayName: "Login",
  handleClick: function handleClick() {
    login.loginBtnClick();
  },
  render: function render() {
    return React.createElement("div", { id: "loginInnerDiv", className: "col-lg-3 col-md-4 col-xs-8 center fadein" }, React.createElement("div", { id: "loginInnerUpperDiv", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("i", { className: "fa fa-user" })), React.createElement("div", { id: "loginInnerLowerDiv", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("button", { className: "btn btn-primary discoverBtn", onClick: this.handleClick }, React.createElement("i", { className: "fa fa-facebook-official" }), " Facebook"), React.createElement("button", { className: "btn btn-warning discoverBtn", onClick: this.handleClick }, "  ", React.createElement("i", { className: "fa fa-google" }), " Google  ")));
  }
});

function renderLoginPage() {
  React.render(React.createElement(Login, null), document.getElementById('loginContainer'));
}
/* jshint esnext: true */

"use strict";

var AddMovie = React.createClass({ displayName: "AddMovie",
  handleClick: function handleClick() {
    MyMoviesActions.addMovieToDb();
  },
  render: function render() {
    return React.createElement("div", { id: "addMovieContainer", className: "col-lg-11 col-md-11 col-xs-12" }, React.createElement("input", { id: "addMovieTitleInputField", type: "text", className: "form-control col-lg-2 col-md-4 col-lg-offset-1 col-md-offset-1 col-xs-8", placeholder: "Title" }), React.createElement("button", { id: "addMovieTitleButton", className: "btn btn-warning col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-xs-4", onClick: this.handleClick }, React.createElement("i", { className: "fa fa-plus-square" }), " Add"));
  }
});

var ListMoviesFromDb = React.createClass({ displayName: "ListMoviesFromDb",
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.loadMovieTitles();
  },
  loadMovieTitles: function loadMovieTitles() {
    var context = this;
    MyMoviesActions.loadMovieTitles(context);
  },
  render: function render() {
    var movieTitleArray = this.state.data.map(function (title) {
      return React.createElement(MovieElementFromDb, { title: title });
    });
    return React.createElement("div", { id: "listMoviesFromDbContainer", className: "col-lg-10 col-md-10 col-md-offset-1 col-xs-12" }, React.createElement("table", { className: "table table-striped" }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "My movies"))), React.createElement("tbody", null, movieTitleArray)));
  }
});

var idCounter = 1;
var MovieElementFromDb = React.createClass({ displayName: "MovieElementFromDb",
  handleClick: function handleClick() {
    var context = this;
    MyMoviesActions.removeMovieFromDb(context);
  },
  render: function render() {
    var btnId = 'removeBtn' + idCounter;
    idCounter++;
    return React.createElement("tr", null, React.createElement("td", { className: "col-xs-9" }, this.props.title), React.createElement("td", { className: "col-xs-3" }, React.createElement("button", { id: btnId, className: "btn btn-danger", onClick: this.handleClick }, React.createElement("i", { className: "fa fa-trash-o" }), " Remove")));
  }
});

var ManagePage = React.createClass({ displayName: "ManagePage",
  render: function render() {
    return React.createElement("div", null, React.createElement(AddMovie, null), React.createElement(ListMoviesFromDb, null));
  }
});
/* jshint esnext: true */
"use strict";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
    var context = this;
    this.loadMovies(context);
  },
  loadMovies: function loadMovies() {
    var context = this;
    MyMoviesActions.loadMovies(context);
  },
  render: function render() {
    var moviesArray = this.state.data.map(function (movie) {
      return React.createElement(Movie, { movie: movie });
    });

    return React.createElement("div", { className: "col-lg-12 col-md-12 col-xs-12 moviesContainer" }, React.createElement(ReactCSSTransitionGroup, { transitionName: "example" }, moviesArray));
  }
});

function renderElements() {
  React.render(React.createElement(MoviesContainer, null), document.getElementById("innerContainer"));
};
/* jshint esnext: true */

'use strict';

var menuItems = [{ 'item': 'fa fa-search,Home,Discover' }, { 'item': 'fa fa-film,Movies,My selection' }, { 'item': 'fa fa-wrench,Manage,Manage' }];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({ displayName: "MenuItem",
  render: function render() {
    var path = '#/' + this.props.link;
    return React.createElement("li", null, React.createElement("a", { href: path }, React.createElement("i", { className: this.props.menuItemIcon }), "  ", this.props.menuItemText));
  }
});

var Navbar = React.createClass({ displayName: "Navbar",
  getInitialState: function getInitialState() {
    return { data: menuItems };
  },
  render: function render() {
    var userProfilPic = userInstance.ProfilePicUrl;
    var userName = userInstance.UserName;
    var userEmail = userInstance.Email;
    var menuItemArray = this.state.data.map(function (item) {
      var params = createMenuItemParams(item);
      return React.createElement(MenuItem, { menuItemIcon: params.get('icon'), menuItemText: params.get('menuText'), link: params.get('path') });
    });

    return React.createElement("div", { className: "nav col-lg-12 col-md-12" }, React.createElement("h3", { className: "col-lg-4 col-md-4" }, "Movie-Collection"), React.createElement("ul", { className: "col-lg-4 col-md-4" }, menuItemArray), React.createElement("div", { className: "col-lg-4 col-md-4" }, userName, " ", React.createElement("img", { src: userProfilPic })));
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
var NavbarMobileOpen = React.createClass({ displayName: "NavbarMobileOpen",
  getInitialState: function getInitialState() {
    return { data: menuItems };
  },
  render: function render() {
    var userProfilPic = userInstance.ProfilePicUrl;
    var userName = userInstance.UserName;
    var userEmail = userInstance.Email;
    console.log(userProfilPic);

    var menuItemArray = this.state.data.map(function (item) {
      var params = createMenuItemParams(item);
      return React.createElement(MenuItem, { menuItemIcon: params.get('icon'), menuItemText: params.get('menuText'), link: params.get('path') });
    });

    return React.createElement("div", { id: "navbarDivOpenedDiv", className: "navbarDivOpened col-xs-12" }, React.createElement("div", { id: "navbarOpenProfileImage" }, React.createElement("div", { id: "navbarProfileBackground" }), React.createElement("div", { id: "navbarProfileData" }, React.createElement("img", { src: userProfilPic }), React.createElement("h4", null, userName), React.createElement("h5", null, userEmail))), React.createElement("div", { id: "navbarOpenLinks" }, React.createElement("ul", { className: "nav" }, menuItemArray)));
  }
});

var opened = false;
var NavbarMobileClosed = React.createClass({ displayName: "NavbarMobileClosed",
  handleClick: function handleClick(event) {
    if (opened == false) {
      opened = true;
      document.getElementById('mobileNavBarLinks').style.width = '85%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'visible';
    } else {
      opened = false;
      document.getElementById('mobileNavBarLinks').style.width = '0%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'hidden';
    }
  },
  render: function render() {
    return React.createElement("div", { className: "navbarMobileClosed col-xs-12" }, React.createElement("i", { className: "fa fa-bars", onClick: this.handleClick }), React.createElement("p", null, "Movie-Collection"));
  }
});

function createMenuItemParams(item) {
  var itemValue = item.item;
  var splitted = [];
  splitted = itemValue.split(",");
  var icon = splitted[0];
  var linkPath = splitted[1];
  var menuText = splitted[2];
  var lowercaseItemIcon = icon.toLowerCase();
  var uppercaseItemText = menuText.toUpperCase();

  var result = new Map();
  result.set('icon', lowercaseItemIcon);
  result.set('path', linkPath);
  result.set('menuText', uppercaseItemText);

  return result;
}

function renderAllNavbar() {
  renderNavbar();
  renderNavbarMobileClosed();
  renderNavbarMobileOpen();
};

function renderNavbar() {
  React.render(React.createElement(Navbar, null), document.getElementById("navBar"));
}

function renderNavbarMobileClosed() {
  React.render(React.createElement(NavbarMobileClosed, null), document.getElementById('mobileNavBar'));
}

function renderNavbarMobileOpen() {
  React.render(React.createElement(NavbarMobileOpen, null), document.getElementById('mobileNavBarLinks'));
}
/* jshint esnext: true */

"use strict";

var Router = ReactRouter;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;

var routes = React.createElement(Route, { name: "default", path: "/", handler: App }, React.createElement(Redirect, { from: "/", to: "/home" }), React.createElement(Route, { name: "home", path: "/Home", handler: DiscoverMoviesContainer }), React.createElement(Route, { name: "movies", path: "/Movies", handler: MoviesContainer }), React.createElement(Route, { name: "manage", path: "/Manage", handler: ManagePage }));

ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('innerContainer'));
});

var App = React.createClass({ displayName: "App",
  render: function render() {
    return React.createElement("div", { id: "loginInnerDiv" }, React.createElement(RouteHandler, null));
  }
});