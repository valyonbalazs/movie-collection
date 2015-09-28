/* jshint esnext: true */

// for jsdom testing, it has to be uncommented during tests
/*let React = require('react/addons');
let http = require('../js/http.js');
let movies = require('../js/movieModel.js');*/

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let DiscoveryChooser = React.createClass({
  render: () => {
    return (
      <div id="discoveryChooserContainer" className="col-lg-12 col-md-12 col-xs-12">
        <h5>A B C</h5>
      </div>
    );
  }
});

let DiscoverMoviesContainer = React.createClass({
  getInitialState: () => {
    return {data: []};
  },
  componentDidMount: function () {
    this.handleClick1();
  },
  handleClick1: function () {
    wasTvBtnClicked = false;
    let context = this;
    DiscoverActions.oneMonthDiscoverBtnClicked(context);
  },
  handleClick3: function () {
    wasTvBtnClicked = false;
    let context = this;
    DiscoverActions.threeMonthDiscoverBtnClicked(context);
  },
  handleClickTvTop: function () {
    wasTvBtnClicked = true;
    let context = this;
    DiscoverActions.tvTopRatedBtnClicked(context);
  },
  handleClickTvAir: function () {
    wasTvBtnClicked = true;
    let context = this;
    DiscoverActions.tvAiringBtnClicked(context);
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
            <div id="discoveryChooserLabel" className="col-lg-4 col-md-4 col-xs-12">
              <h3 id="discoverLabel"></h3>
            </div>
            <div id="discoveryChooserButtons" className="col-lg-9 col-md-9 col-xs-12">
              <div >
                  <button id="OneMonthButton" className="bootstrapBtn btn btn-success" onClick={this.handleClick1}>MOVIES - LAST MONTH</button>
                  <i className="fontawesomeBtn fa fa-film" onClick={this.handleClick1}></i>1 Month
            </div>
              <div >
                  <button id="ThreeMonthButton" className="bootstrapBtn btn btn-success" onClick={this.handleClick3}>MOVIES - LAST 3 MONTHS</button>
                  <i className="fontawesomeBtn fa fa-film" onClick={this.handleClick3}></i>3 Month
            </div>
              <div>
                  <button id="ThreeMonthButton" className="bootstrapBtn btn btn-warning" onClick={this.handleClickTvTop}>TV - TOP RATED</button>
                  <i className="fontawesomeBtn fa fa-tv" onClick={this.handleClickTvTop}></i>Top rated
            </div>
              <div >
                  <button id="ThreeMonthButton" className="bootstrapBtn btn btn-warning" onClick={this.handleClickTvAir}>TV - AIRING TODAY</button>
                  <i className="fontawesomeBtn fa fa-television" onClick={this.handleClickTvAir}></i>Airing
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
  React.render(<DiscoverMoviesContainer />, document.getElementById('innerContainer'));
};

// module.exports for testing
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = DiscoverMoviesContainer;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], () => {
      return DiscoverMoviesContainer;
    });
  } else {
    window.DiscoverMoviesContainer = DiscoverMoviesContainer;
  }
}
