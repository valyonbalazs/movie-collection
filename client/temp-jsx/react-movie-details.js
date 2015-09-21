/* jshint esnext: true */

let MovieDetailsContainer = React.createClass({displayName: "MovieDetailsContainer",
  render: function () {
    let id = this.props.params.id;
    return (
      React.createElement("div", null, 
        React.createElement("p", null, id)
      )
    );
  }
});
