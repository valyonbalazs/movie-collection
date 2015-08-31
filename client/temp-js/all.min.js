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
    movieListData.push(movie);

    // React container update
    this.setState({ data: movieListData });
  },
  successDiscover: function successDiscover(data) {
    var movieData = undefined;
    movieData = JSON.parse(data);
    console.log(movieData);

    for (var key in movieData.results) {
      var title = movies.modifyTitle(movieData.results[key].title);
      var backdropPath = movies.createImageUrl(movieData.results[key].backdrop_path);
      var posterPath = movies.createImageUrl(movieData.results[key].poster_path);
      var overview = movies.modifyOverview(movieData.results[key].overview);
      var releaseDate = movies.modifyReleaseDate(movieData.results[key].release_date);
      var average = movieData.results[key].vote_average + ' ';
      var movie = new MovieElement(title, overview, average, releaseDate, backdropPath, posterPath);

      discoverMovies.push(movie);
      this.setState({ data: discoverMovies });
    }
  }
};
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

/*let starterMovieTitles = [
  {title: 'blade runner'},
  {title: 'avengers'},
  {title: 'batman'},
  {title: 'star wars episode iv'},
  {title: 'star wars episode iii'},
  {title: 'schindler\'s list'},
  {title: 'gladiator'},
  {title: 'men in black'},
  {title: 'djangov'},
  {title: 'alien'},
  {title: 'predator'},
  {title: 'jurassic park'}
];*/

'use strict';

var starterMovieTitles = [];

var movieListData = [];

function addUserMovies() {
  var uid = localStorage.getItem('uid');
  ref.child('movielist').child(uid).set({
    movies: starterMovieTitles
  });
}

var discoverMovies = [];
/* jshint esnext: true */

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
    var url = 'http://image.tmdb.org/t/p/w500' + endOfTheUrl;
    return url;
  },
  createMovieUrl: function createMovieUrl(movieTitle) {
    var api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    var urlFirstPart = 'https://api.themoviedb.org/3/search/movie?query=';
    var url = urlFirstPart + movieTitle + api_key;
    return url;
  },
  modifyOverview: function modifyOverview(overview) {
    var originalOverview = overview;
    var newOverview = undefined;
    if (originalOverview.length > 150) {
      newOverview = originalOverview.substr(0, 130) + '...';
      return newOverview;
    } else {
      return originalOverview;
    }
  },
  modifyReleaseDate: function modifyReleaseDate(releaseDate) {
    var originalReleaseDate = releaseDate;
    var newReleaseDate = originalReleaseDate.substr(0, 4) + ' ';
    return newReleaseDate;
  },
  modifyTitle: function modifyTitle(title) {
    var originalTitle = title;
    var newTitle = originalTitle.substr(0, 22);
    return newTitle;
  },
  createDiscoverUrl: function createDiscoverUrl() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = '01';
    var insertableDate = year + '-' + month + '-' + day;
    var api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    var urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' + insertableDate + '&sort_by=popularity.desc&';
    var url = urlFirstPart + api_key;
    return url;
  },
  create1MonthDiscoverUrl: function create1MonthDiscoverUrl() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = '01';
    var insertableDate = year + '-' + month + '-' + day;
    var api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    var urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' + insertableDate + '&sort_by=popularity.desc&';
    var url = urlFirstPart + api_key;
    console.log(url);
    return url;
  },
  create3MonthDiscoverUrl: function create3MonthDiscoverUrl() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() - 2;
    var day = '01';
    var insertableDate = year + '-' + month + '-' + day;
    var api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
    var urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' + insertableDate + '&sort_by=vote_count.desc&';
    var url = urlFirstPart + api_key;
    console.log(url);
    return url;
  }
};
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
      renderPage.renderLoginPage();
    });
  }
})();
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
  }),
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
/* jshint esnext: true */

"use strict";

var DiscoveryChooser = React.createClass({ displayName: "DiscoveryChooser",
  render: function render() {
    return React.createElement("div", { id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("h5", null, "A B C"));
  }
});

var DiscoverMoviesContainer = React.createClass({ displayName: "DiscoverMoviesContainer",
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {},
  removeContainer: function removeContainer() {
    var innerContainerChildren = document.getElementById('innerDiscoverContainer').children;
    var spanChildrenCount = innerContainerChildren[0].childNodes.length;
    var spanElement = innerContainerChildren[0];
    if (spanChildrenCount > 0) {
      while (spanElement.firstChild) {
        spanElement.removeChild(spanElement.firstChild);
      }
    }
  },
  handleClick1: function handleClick1() {
    this.removeContainer();
    var context = this;
    http.ajax(movies.create1MonthDiscoverUrl()).get().then(http.successDiscover.bind(context));
  },
  handleClick3: function handleClick3() {
    this.removeContainer();
    var context = this;
    http.ajax(movies.create3MonthDiscoverUrl()).get().then(http.successDiscover.bind(context));
  },
  render: function render() {
    var moviesArray = this.state.data.map(function (movie) {
      return React.createElement(Movie, { movie: movie });
    });

    return React.createElement("div", { id: "moviesContainer", className: "col-lg-12 col-md-12 col-xs-12 moviesContainer" }, React.createElement("div", { id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12" }, React.createElement("div", { className: "col-lg-2 col-md-2 col-xs-6" }, React.createElement("button", { className: "btn btn-primary", onClick: this.handleClick1 }, "LAST 1 MONTH")), React.createElement("div", { className: "col-lg-2 col-md-2 col-xs-6" }, React.createElement("button", { className: "btn btn-primary", onClick: this.handleClick3 }, "LAST 3 MONTH "))), React.createElement("div", { id: "innerDiscoverContainer" }, React.createElement(ReactCSSTransitionGroup, { transitionName: "example" }, moviesArray)));
  }
});

function renderDiscoverMovies() {
  React.render(React.createElement(DiscoverMoviesContainer, null), document.getElementById("innerContainer"));
};
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
    return React.createElement("div", { id: "loginInnerDiv", className: "col-lg-3 col-md-3 col-xs-8 center" }, React.createElement("h3", null, "Log in with"), React.createElement("button", { className: "btn btn-primary", onClick: this.handleClick }, "Facebook"));
  }
});

function renderLoginPage() {
  React.render(React.createElement(Login, null), document.getElementById('loginContainer'));
}
/* jshint esnext: true */

"use strict";

var ManagePage = React.createClass({ displayName: "ManagePage",
  render: function render() {
    return React.createElement("div", null, React.createElement("h3", null, "MANAGE PAGE"));
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
    this.loadMovies();
  },
  loadMovies: function loadMovies() {
    movieListData = [];

    var promise = function promise() {
      return new Promise(function (resolve, reject) {
        var uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = snapshot.val()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var i = _step.value;

              starterMovieTitles.push(i);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          resolve(function () {});
        });
      });
    };

    var context = this;
    promise().then(function () {
      for (var key in starterMovieTitles) {
        var title = starterMovieTitles[key].title;
        http.ajax(movies.createMovieUrl(title)).get().then(http.success.bind(context));
      }
    });
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

var menuItems = [{ 'item': 'fa fa-home,Home,Top rated' }, { 'item': 'fa fa-film,Movies,My selection' }, { 'item': 'fa fa-wrench,Manage,Manage' }];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({ displayName: "MenuItem",
  render: function render() {
    var path = '#/' + this.props.link;
    return React.createElement("li", null, React.createElement("a", { href: path }, this.props.menuItemText));
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

    return React.createElement("div", { className: "nav col-lg-12 col-md-12" }, React.createElement("h3", null, "Movie-Collection"), React.createElement("ul", null, menuItemArray), React.createElement("div", null, userName, " ", React.createElement("img", { src: userProfilPic })));
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

    return React.createElement("div", { id: "navbarDivOpenedDiv", className: "navbarDivOpened col-xs-12" }, React.createElement("div", { id: "navbarOpenProfileImage" }, React.createElement("img", { src: userProfilPic }), React.createElement("h4", null, userName), React.createElement("h5", null, userEmail)), React.createElement("div", { id: "navbarOpenLinks" }, React.createElement("ul", { className: "nav" }, menuItemArray)));
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