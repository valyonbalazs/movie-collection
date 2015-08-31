/* jshint esnext: true */

let Router = ReactRouter;
let Route = ReactRouter.Route;
let RouteHandler = ReactRouter.RouteHandler;
let Link = ReactRouter.Link;
let Redirect = ReactRouter.Redirect;

let routes = (
  React.createElement(Route, {name: "default", path: "/", handler: App}, 
    React.createElement(Redirect, {from: "/", to: "/home"}), 
    React.createElement(Route, {name: "home", path: "/Home", handler: Home}), 
    React.createElement(Route, {name: "movies", path: "/Movies", handler: MoviesContainer}), 
    React.createElement(Route, {name: "manage", path: "/Manage", handler: ManagePage})
  )
);

ReactRouter.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.getElementById('innerContainer'));
});

let App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", {id: "loginInnerDiv"}, 
        React.createElement(RouteHandler, null)
      )
    );
  }
});
