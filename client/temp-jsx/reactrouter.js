var Route = ReactRouter.Route;
var routes = ReactRouter.Routes;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var App = React.createClass({displayName: "App",

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      React.createElement("div", null, 
        React.createElement("ul", null, 
          React.createElement("li", null, React.createElement(Link, {to: "page1"}, "Page 1")), 
          React.createElement("li", null, React.createElement(Link, {to: "page2"}, "Page 2"))
        ), 
          React.createElement(RouteHandler, null)
      )
    );
  }
});

var Page1 = React.createClass({displayName: "Page1",
  render: function () {
    return (
      React.createElement("div", {className: "Image"}, 
        React.createElement("h1", null, "Page 1"), 
        React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
      )
    );
  }
});

var Page2 = React.createClass({displayName: "Page2",
  render: function () {
    return (
      React.createElement("div", {className: "Image"}, 
        React.createElement("h1", null, "Page 2"), 
        React.createElement("p", null, "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
      )
    );
  }
});

var routes = (
  React.createElement(Route, {handler: App}, 
    React.createElement(Route, {name: "page1", handler: Page1}), 
    React.createElement(Route, {name: "page2", handler: Page2})
  )
);

ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('innerContainer'));
});
