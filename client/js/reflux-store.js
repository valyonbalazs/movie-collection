/* jshint esnext: true */

let movieActionStore = Reflux.createStore({
  listenables: [MovieActions],
  init: function () {

  },
  oneMonthDiscoverBtnClicked: function (that) {
    let context = that;
    context.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = 'Best movies of the last month';
    http.ajax(movies.create1MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  },
  threeMonthDiscoverBtnClicked: function (that) {
    let context = that;
    context.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = 'Best movies of the last 3 months';
    http.ajax(movies.create3MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  }
});
