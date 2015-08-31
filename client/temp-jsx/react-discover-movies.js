/* jshint esnext: true */

let DiscoveryChooser = React.createClass({displayName: "DiscoveryChooser",
  render: function () {
    return (
      React.createElement("div", {id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12"}, 
        React.createElement("h5", null, "A B C")
      )
    );
  }
});

let DiscoverMoviesContainer = React.createClass({displayName: "DiscoverMoviesContainer",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
     //this.loadMovies();
  },
  loadMovies: function() {
    let context = this;

    http.ajax(movies.createDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));

  },
  handleClick1: function () {
    let context = this;
    http.ajax(movies.create1MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  },
  handleClick3: function () {
    let context = this;
    http.ajax(movies.create3MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  },
  render: function () {
      let moviesArray = this.state.data.map(function (movie) {
        return (
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {className: "col-lg-12 col-md-12 col-xs-12 moviesContainer"}, 
          React.createElement("div", {id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12"}, 
            React.createElement("div", {className: "col-lg-2 col-md-2 col-xs-6"}, 
                React.createElement("button", {className: "btn btn-primary", onClick: this.handleClick1}, "LAST 1 MONTH")
            ), 
            React.createElement("div", {className: "col-lg-2 col-md-2 col-xs-6"}, 
                React.createElement("button", {className: "btn btn-primary", onClick: this.handleClick3}, "LAST 3 MONTH ")
            )
          ), 
          React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
            moviesArray
          )
        )
      );
  }
});

function renderDiscoverMovies() {
  React.render(React.createElement(DiscoverMoviesContainer, null), document.getElementById("innerContainer"));
};
