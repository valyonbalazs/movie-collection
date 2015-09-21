/* jshint esnext: true */

let discoverActionStore = Reflux.createStore({
  discoverMovies: [],
  listenables: [DiscoverActions],
  init: () => {
    // do initializtion
  },
  addMovieToStore: function (item, context) {
    this.discoverMovies.push(item);
    context.setState({data: this.discoverMovies});
  },
  removeContainer: () => {
    let innerContainerChildren = document.getElementById('innerDiscoverContainer').children;
    if (innerContainerChildren[0] === undefined) {
      // do nothing
    } else {
      let spanChildrenCount = innerContainerChildren[0].childNodes.length;
      let spanElement = innerContainerChildren[0];
      if (spanChildrenCount > 0) {
        while (spanElement.firstChild) {
          spanElement.removeChild(spanElement.firstChild);
        }
      }
    }
  },
  oneMonthDiscoverBtnClicked: function (that) {
    let context = that;
    this.btnClicked('Best movies of the last month', context, movies.create1MonthDiscoverUrl());
  },
  threeMonthDiscoverBtnClicked: function (that) {
    let context = that;
    this.btnClicked('Best movies of the last 3 months', context, movies.create3MonthDiscoverUrl());
  },
  btnClicked: function (labelText, that, monthFunction) {
    let context = that;
    DiscoverActions.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = labelText;
    http.ajax(monthFunction)
      .get()
      .then(http.successDiscover.bind(context));
  }
});

let myMoviesActionStore = Reflux.createStore({
  indexTitleMap: new Map(),
  movieListData: [],
  ownMovieTitleList: [],
  keyTitleMap: new Map(),
  listenables: [MyMoviesActions],
  init: () => {
    // do initializtion
  },
  loadMovieTitles: function (that) {
    let context = that;
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          myMoviesActionStore.ownMovieTitleList = [];
          let data = snapshot.val();
          if (data === null) {
            //do nothing
          } else {

            //Has to get the keys from the database for the adding-function
            //to create a non-existing key for the new element
            for (let i in data) {
              let values = data;
              myMoviesActionStore.indexTitleMap.set(i, values[i].title);
            }

            for (let j in data) {
              myMoviesActionStore.ownMovieTitleList.push(data[j].title);
            }
            this.setState({data: myMoviesActionStore.ownMovieTitleList});
            resolve(function () { });
          }
        }.bind(context));
      });
    };

    promise().then(function () {
      this.setState({data: myMoviesActionStore.ownMovieTitleList});
    }.bind(context));
  },
  loadMovies: function (that) {
    let context = that;
    let wasItUsed = false;
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          myMoviesActionStore.ownMovieTitleList = [];
          myMoviesActionStore.movieListData = [];
          let data = snapshot.val();
          for (let i in data) {
            myMoviesActionStore.ownMovieTitleList.push(data[i].title);
          }
          if (wasItUsed === true) {
            myMoviesActionStore.movieListData = [];
            for (var key in myMoviesActionStore.ownMovieTitleList) {
              let title = myMoviesActionStore.ownMovieTitleList[key];
              http.ajax(movies.createMovieUrl(title))
                .get()
                .then(http.success.bind(context));
            }
          }
          resolve(function () { });
        });
      });
    };

    promise().then(function () {
      wasItUsed = true;
      for (var key in myMoviesActionStore.ownMovieTitleList) {
        let title = myMoviesActionStore.ownMovieTitleList[key];
        http.ajax(movies.createMovieUrl(title))
          .get()
          .then(http.success.bind(context));
      }
    });
  },
  addMovieToDb: function (item) {
    let movieTitle = document.getElementById('addMovieTitleInputField').value;
    let uid = localStorage.getItem('uid');
    let biggestKey = 1;
    for (let i of indexTitleMap) {
      if (parseInt(i[0]) > biggestKey) {
        biggestKey = i[0];
      }
    }
    let convertToNumber = parseInt(biggestKey);
    let newBiggestKey = convertToNumber + 1;

    ref.child('movielist').child(uid).child('movies').child(newBiggestKey).set({
      title: movieTitle
    });
  },
  addMovieToMyList: function (item, context) {
    this.movieListData.push(item);
    context.setState({data: this.movieListData});
  },
  removeMovieFromDb: function (that) {
    let context = that;
    let uid = localStorage.getItem('uid');
    let title = context.props.title;
    ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
      let data = snapshot.val();
      for (let i in data) {
        let values = data;
        myMoviesActionStore.keyTitleMap.set(i, values[i].title);
      }

      for (let j of myMoviesActionStore.keyTitleMap) {
        if (title === j[1]) {
          ref.child('movielist').child(uid).child('movies').child(j[0]).remove();
          let indexOfElement = ownMovieTitleList.indexOf(j[1]);
          if (indexOfElement > -1) {
            ownMovieTitleList.splice(indexOfElement, 1);
          }
        }
      }
    });
  }
});

let movieDetailsActionStore = Reflux.createStore({
  movieData: {},
  movieCredits: [],
  movieCrew: [],
  listenables: [MovieDetailsActions],
  init: () => {
    // do initializtion
  },
  addMovieData: function (item, context) {
    this.movieData = item;
    context.setState({data: this.movieData});
  },
  addCreditsData: function(credits, crew, context) {
    this.movieCredits = credits;
    this.movieCrew = crew;
    context.setState({movieCredits: this.movieCredits});
    context.setState({movieCrew: this.movieCrew});
  },
  loadMovieData: function (id, that) {
    let context = that;
    let promise = function () {
      return new Promise(function (resolve, reject) {
          http.ajax(movieDetails.createMovieUrl(id))
            .get()
            .then(http.successDetails.bind(context));
          resolve(function () { });
        });
    };

    promise().then(function () {});
  },
  loadCredtisData: function(id, that) {
    let context = that;
    let promise = function () {
      return new Promise(function (resolve, reject) {
          http.ajax(movieDetails.createCreditsUrl(id))
            .get()
            .then(http.successDetailsCredits.bind(context));
          resolve(function () { });
        });
    };
    promise().then(function () {});
  }
});
