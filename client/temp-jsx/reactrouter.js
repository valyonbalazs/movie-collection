/* jshint esnext: true */

let Router = ReactRouter;
let Route = ReactRouter.Route;
let routes = ReactRouter.Routes;
let RouteHandler = ReactRouter.RouteHandler;
let Link = ReactRouter.Link;

let routes = (
  React.createElement(Route, {path: "/", handler: App}, 
    React.createElement(Route, {name: "home", path: "/Home", handler: App}), 
    React.createElement(Route, {name: "movies", path: "/Movies", handler: MoviesContainer}), 
    React.createElement(Route, {name: "manage", path: "/Manage", handler: ManagePage})
  )
);

ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('innerContainer'));
});
