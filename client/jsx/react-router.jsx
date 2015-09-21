/* jshint esnext: true */

let Router = ReactRouter;
let Route = ReactRouter.Route;
let RouteHandler = ReactRouter.RouteHandler;
let Link = ReactRouter.Link;
let Redirect = ReactRouter.Redirect;

let routes = (
  <Route name="default" path="/" handler={App}>
    <Redirect from="/" to="/home" />
    <Route name="home" path="/Home" handler={DiscoverMoviesContainer} />
    <Route name="movies" path="/Movies" handler={MoviesContainer} />
    <Route name="manage" path="/Manage" handler={ManagePage} />
    <Route name="movieDetails" path="/MovieDetails/:id" handler={MovieDetailsContainer} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('innerContainer'));
});

let App = React.createClass({
  render: function () {
    return (
      <div id="loginInnerDiv">
        <RouteHandler />
      </div>
    );
  }
});
