/* jshint esnext: true */

let discoverActionStore = Reflux.createStore({
  discoverMovies: [],
  listenables: [DiscoverActions],
  init: function () {
  },
  addMovieToStore: function (item, context) {
    this.discoverMovies.push(item);
    context.setState({data: this.discoverMovies});
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
    context.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = labelText;
    http.ajax(monthFunction)
      .get()
      .then(http.successDiscover.bind(context));
  }
});
