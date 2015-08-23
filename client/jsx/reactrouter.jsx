var Route = ReactRouter.Route;
var routes = ReactRouter.Routes;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  handleClick: function () {
      loginBtnClick();
  },
  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      <div class="col-lg-3 col-md-3 col-xs-10">
        <h3>LOGIN</h3>
        <Link className="btn btn-primary" to="page1" onClick={this.handleClick}>Facebook</Link>
        <RouteHandler />
      </div>
    );
  }
});

var Page1 = React.createClass({
  render: function () {
    return (<div/>);
  }
});

var Page2 = React.createClass({
  render: function () {
    return (
      <div className="Image">
        <h1>Page 2</h1>
        <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="page1" handler={Page1} />
    <Route name="page2" handler={Page2} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('innerContainer'));
});
