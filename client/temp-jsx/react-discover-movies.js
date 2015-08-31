/* jshint esnext: true */

let DiscoverMoviesContainer = React.createClass({displayName: "DiscoverMoviesContainer",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
     this.loadMovies();
  },
  loadMovies: function() {
    let context = this;

    http.ajax(movies.createDiscoverUrl())
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
