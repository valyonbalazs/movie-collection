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
    this.handleClick1();
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
    var label = document.getElementById('discoverLabel');
    label.innerHTML = 'Best movies of the last month';
    let context = this;
    http.ajax(movies.create1MonthDiscoverUrl())
      .get()
      .then(http.successDiscover.bind(context));
  },
  handleClick3: function () {
    this.removeContainer();
    var label = document.getElementById('discoverLabel');
    label.innerHTML = 'Best movies of the last 3 months';
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
            <div id="discoveryChooserLabel" className="col-lg-8 col-md-7 col-xs-12">
              <h3 id="discoverLabel">Label</h3>
            </div>
            <div id="discoveryChooserButtons" className="col-lg-5 col-md-5 col-xs-12">
              <div className="col-lg-5 col-md-6 col-xs-6 col-lg-offset-2">
                  <button id="OneMonthButton" className="btn btn-success" onClick={this.handleClick1}>LAST 1 MONTH</button>
              </div>
              <div className="col-lg-5 col-md-6 col-xs-6">
                  <button id="ThreeMonthButton" className="btn btn-warning" onClick={this.handleClick3}>LAST 3 MONTHS </button>
              </div>
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
