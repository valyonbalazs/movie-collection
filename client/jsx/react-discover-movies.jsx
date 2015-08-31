/* jshint esnext: true */

let DiscoverMoviesContainer = React.createClass({
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
          <Movie movie={movie} />
        );
      });

      return (
        <div className="col-lg-12 col-md-12 col-xs-12 moviesContainer" >
          <ReactCSSTransitionGroup transitionName="example">
            {moviesArray}
          </ReactCSSTransitionGroup>
        </div>
      );
  }
});

function renderDiscoverMovies() {
  React.render(<DiscoverMoviesContainer />, document.getElementById("innerContainer"));
};
