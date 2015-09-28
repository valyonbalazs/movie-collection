/* jshint esnext: true */

// for jsdom testing, it has to be uncommented during tests
/*let React = require('react/addons');
let http = require('../js/http.js');
let movies = require('../js/movieModel.js');*/

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let DiscoveryChooser = React.createClass({displayName: "DiscoveryChooser",
  render: () => {
    return (
      React.createElement("div", {id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12"}, 
        React.createElement("h5", null, "A B C")
      )
    );
  }
});

let DiscoverMoviesContainer = React.createClass({displayName: "DiscoverMoviesContainer",
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
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {id: "moviesContainer", className: "col-lg-12 col-md-12 col-xs-12 moviesContainer"}, 
          React.createElement("div", {id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12"}, 
            React.createElement("div", {id: "discoveryChooserLabel", className: "col-lg-3 col-md-3 col-xs-12"}, 
              React.createElement("h3", {id: "discoverLabel"})
            ), 
            React.createElement("div", {id: "discoveryChooserButtons", className: "col-lg-9 col-md-9 col-xs-12"}, 
              React.createElement("div", {className: "col-lg-3 col-md-3 col-xs-6"}, 
                  React.createElement("button", {id: "OneMonthButton", className: "btn btn-success", onClick: this.handleClick1}, "MOVIES - LAST MONTH")
              ), 
              React.createElement("div", {className: "col-lg-3 col-md-3 col-xs-6"}, 
                  React.createElement("button", {id: "ThreeMonthButton", className: "btn btn-success", onClick: this.handleClick3}, "MOVIES - LAST 3 MONTHS")
              ), 
              React.createElement("div", {className: "col-lg-3 col-md-3 col-xs-6"}, 
                  React.createElement("button", {id: "ThreeMonthButton", className: "btn btn-warning", onClick: this.handleClickTvTop}, "TV - TOP RATED")
              ), 
              React.createElement("div", {className: "col-lg-3 col-md-3 col-xs-6"}, 
                  React.createElement("button", {id: "ThreeMonthButton", className: "btn btn-warning", onClick: this.handleClickTvAir}, "TV - AIRING TODAY")
              )
            )
          ), 
          React.createElement("div", {id: "innerDiscoverContainer"}, 
            React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
              moviesArray
            )
          )
        )
      );
  }
});

function renderDiscoverMovies() {
  React.render(React.createElement(DiscoverMoviesContainer, null), document.getElementById('innerContainer'));
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
