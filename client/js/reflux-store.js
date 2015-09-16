/* jshint esnext: true */

let discoverActionStore = Reflux.createStore({
  discoverMovies: [],
  listenables: [DiscoverActions],
  init: () => {
  },
  addMovieToStore: function (item, context) {
    this.discoverMovies.push(item);
    context.setState({data: this.discoverMovies});
  },
  removeContainer: () => {
    let innerContainerChildren = document.getElementById('innerDiscoverContainer').children;
    if (innerContainerChildren[0] === undefined) {

    } else {
      let spanChildrenCount = innerContainerChildren[0].childNodes.length;
      let spanElement = innerContainerChildren[0];
      if(spanChildrenCount > 0) {
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
  movieListData: [],
  ownMovieTitleList: [],
  listenables: [MyMoviesActions],
  init: () => {
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
  addMovieToMyList: function (item, context) {
    this.movieListData.push(item);
    context.setState({data: this.movieListData});
  },
  removeMovieFromMyList: function () {

  }
});
