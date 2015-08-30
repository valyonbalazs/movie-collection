/*var Route = ReactRouter.Route;
var routes = ReactRouter.Routes;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  handleClick: function () {
      loginBtnClick();
      //loginBtnClickWithoutAuth();
  },
  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      <div id="loginInnerDiv" className="col-lg-3 col-md-3 col-xs-8 center">
          <h3>LOGIN</h3>
          <Link className="btn btn-primary" to="movies" onClick={this.handleClick}>Facebook</Link>
        <RouteHandler />
      </div>
    );
  }
});

var MoviesPage = React.createClass({
  render: function () {
    return (<div/>);
  }
});

var routes = (
  <Route handler={App}>
    <Route name="movies" handler={MoviesPage} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('loginContainer'));
});*/

var Router = ReactRouter;
var Route = ReactRouter.Route;
var routes = ReactRouter.Routes;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var routes = (
  React.createElement(Route, {path: "/", handler: App}, 
    React.createElement(Route, {name: "home", path: "/Home", handler: App}), 
    React.createElement(Route, {name: "movies", path: "/Movies", handler: MoviesContainer}), 
    React.createElement(Route, {name: "manage", path: "/Manage", handler: ManagePage})
  )
);

var App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", {id: "loginInnerDiv"}, 
        React.createElement("h3", null, "Home"), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});

var ManagePage = React.createClass({displayName: "ManagePage",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "MANAGE PAGE")
      )
    );
  }
});


ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('innerContainer'));
});
