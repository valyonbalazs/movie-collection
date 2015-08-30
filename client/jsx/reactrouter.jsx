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
  <Route path="/" handler={App}>
    <Route name="home" path="/Home" handler={App} />
    <Route name="movies" path="/Movies" handler={MoviesContainer} />
    <Route name="manage" path="/Manage" handler={ManagePage} />
  </Route>
);

var App = React.createClass({
  render: function () {
    return (
      <div id="loginInnerDiv">
        <h3>Home</h3>
        <RouteHandler />
      </div>
    );
  }
});

var ManagePage = React.createClass({
  render: function () {
    return (
      <div>
        <h3>MANAGE PAGE</h3>
      </div>
    );
  }
});


ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('innerContainer'));
});
