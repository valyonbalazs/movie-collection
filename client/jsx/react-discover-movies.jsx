/* jshint esnext: true */

let DiscoveryChooser = React.createClass({
  render: function () {
    return (
      <div id="discoveryChooserContainer" className="col-lg-12 col-md-12 col-xs-12">
        <h5>A B C</h5>
      </div>
    );
  }
});

let DiscoverMoviesContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {

  },
  removeContainer: function () {
    let innerContainerChildren = document.getElementById('innerDiscoverContainer').children;
    let spanChildrenCount = innerContainerChildren[0].childNodes.length;
    let spanElement = innerContainerChildren[0];
    if(spanChildrenCount > 0) {
      while (spanElement.firstChild) {
        spanElement.removeChild(spanElement.firstChild);
      }
    }
  },
  handleClick1: function () {
    this.removeContainer();
    let context = this;
    http.ajax(movies.create1MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  },
  handleClick3: function () {
    this.removeContainer();
    let context = this;
    http.ajax(movies.create3MonthDiscoverUrl())
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
        <div id="moviesContainer" className="col-lg-12 col-md-12 col-xs-12 moviesContainer" >
          <div id="discoveryChooserContainer" className="col-lg-12 col-md-12 col-xs-12">
            <div className="col-lg-2 col-md-2 col-xs-6">
                <button className="btn btn-primary" onClick={this.handleClick1}>LAST 1 MONTH</button>
            </div>
            <div className="col-lg-2 col-md-2 col-xs-6">
                <button className="btn btn-primary" onClick={this.handleClick3}>LAST 3 MONTH </button>
            </div>
          </div>
          <div id="innerDiscoverContainer">
            <ReactCSSTransitionGroup transitionName="example">
              {moviesArray}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      );
  }
});

function renderDiscoverMovies() {
  React.render(<DiscoverMoviesContainer />, document.getElementById("innerContainer"));
};
