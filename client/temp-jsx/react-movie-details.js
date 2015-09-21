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
      React.createElement("div", {id: "movieDetailsContainer", className: "col-lg-12 col-md-12 col-xs-12 movie"}, 
        React.createElement("div", {id: "movieDetailsPoster", className: "col-lg-6 col-md-6"}, 
          React.createElement("img", {src: this.state.data.posterPath})
        ), 
        React.createElement("div", {id: "movieDetailsContent", className: "col-lg-6 col-md-6"}, 
          React.createElement("div", {id: "movieDetailsTitleAndYear", className: "col-lg-12 col-md-12"}, 
            React.createElement("h3", null, this.state.data.title), 
            React.createElement("h5", null, "Publishing date: ", this.state.data.publishDate), 
            React.createElement("h5", null, this.state.data.genre, "  ", this.state.data.vote_average)
          ), 
          React.createElement("div", {id: "movieDetailsOverview", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, this.state.data.overview)
          )
        )
      )
    );
  }
});
