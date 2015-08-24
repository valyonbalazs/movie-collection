var Route = ReactRouter.Route;
var routes = ReactRouter.Routes;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var App = React.createClass({displayName: "App",

  contextTypes: {
    router: React.PropTypes.func
  },
  handleClick: function () {
      //loginBtnClick();
      loginBtnClickWithoutAuth();
  },
  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      React.createElement("div", {id: "loginInnerDiv", className: "col-lg-3 col-md-3 col-xs-8 center"}, 
          React.createElement("h3", null, "LOGIN"), 
          React.createElement(Link, {className: "btn btn-primary", to: "movies", onClick: this.handleClick}, "Facebook"), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

var MoviesPage = React.createClass({displayName: "MoviesPage",
  render: function () {
    return (React.createElement("div", null));
  }
});

var routes = (
  React.createElement(Route, {handler: App}, 
    React.createElement(Route, {name: "movies", handler: MoviesPage})
  )
);

ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('loginContainer'));
});
