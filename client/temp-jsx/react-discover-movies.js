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
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {id: "moviesContainer", className: "col-lg-12 col-md-12 col-xs-12 moviesContainer"}, 
          React.createElement("div", {id: "discoveryChooserContainer", className: "col-lg-12 col-md-12 col-xs-12"}, 
            React.createElement("div", {id: "discoveryChooserLabel", className: "col-lg-8 col-md-7 col-xs-12"}, 
              React.createElement("h3", {id: "discoverLabel"}, "Label")
            ), 
            React.createElement("div", {id: "discoveryChooserButtons", className: "col-lg-5 col-md-5 col-xs-12"}, 
              React.createElement("div", {className: "col-lg-5 col-md-6 col-xs-6 col-lg-offset-2"}, 
                  React.createElement("button", {id: "OneMonthButton", className: "btn btn-success", onClick: this.handleClick1}, "LAST 1 MONTH")
              ), 
              React.createElement("div", {className: "col-lg-5 col-md-6 col-xs-6"}, 
                  React.createElement("button", {id: "ThreeMonthButton", className: "btn btn-warning", onClick: this.handleClick3}, "LAST 3 MONTHS ")
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
