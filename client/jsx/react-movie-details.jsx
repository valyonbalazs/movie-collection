/* jshint esnext: true */

let MovieDetailsContainer = React.createClass({
  render: function () {
    let id = this.props.params.id;
    return (
      <div>
        <p>{id}</p>
      </div>
    );
  }
});
