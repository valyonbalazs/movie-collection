/* jshint esnext: true */

let MovieDetailsContainer = React.createClass({displayName: "MovieDetailsContainer",
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    let context = this;
    let id = this.props.params.id;
    MovieDetailsActions.loadMovieData(id, context);
  },
  render: function () {
    return (
      React.createElement("div", {id: "movieDetailsContainer", className: "col-lg-10 col-md-10 col-xs-12 movie"}, 
        React.createElement("div", {id: "movieDetailsPoster", className: "col-lg-5 col-md-5"}, 
          React.createElement("img", {src: this.state.data.posterPath})
        ), 
        React.createElement("div", {id: "movieDetailsContent", className: "col-lg-7 col-md-7"}

        )
      )
    );
  }
});
