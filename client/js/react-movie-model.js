var backdrop = React.createClass({
  render: function() {
    return React.createElement("div", {className: 'col-md-6'},"inner div", null);
  }
});

var movieComponent = React.createClass({
    render: function() {
        return React.createElement(backdrop, null, "Hello ", null);
    }
});

React.render(
    React.createElement(movieComponent, null ), document.getElementById('innerContainer')
);
