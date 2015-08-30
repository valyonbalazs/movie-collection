/* jshint esnext: true */

let Router = ReactRouter;
let Route = ReactRouter.Route;
let routes = ReactRouter.Routes;
let RouteHandler = ReactRouter.RouteHandler;
let Link = ReactRouter.Link;

let routes = (
  <Route path="/" handler={App}>
    <Route name="home" path="/Home" handler={App} />
    <Route name="movies" path="/Movies" handler={MoviesContainer} />
    <Route name="manage" path="/Manage" handler={ManagePage} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('innerContainer'));
});
