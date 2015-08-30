/* jshint esnext: true */

let App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", {id: "loginInnerDiv"}, 
        React.createElement(RouteHandler, null)
      )
    );
  }
});
