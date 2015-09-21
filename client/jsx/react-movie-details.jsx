/* jshint esnext: true */

let MovieDetailsContainer = React.createClass({
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
      <div id="movieDetailsContainer" className="col-lg-12 col-md-12 col-xs-12 movie">
        <div id="movieDetailsPoster" className="col-lg-6 col-md-6">
          <img src={this.state.data.posterPath} />
        </div>
        <div id="movieDetailsContent" className="col-lg-6 col-md-6">
          <div id="movieDetailsTitleAndYear" className="col-lg-12 col-md-12">
            <h3>{this.state.data.title}</h3>
            <h5>Publishing date: {this.state.data.publishDate}</h5>
            <h5>{this.state.data.genre}  {this.state.data.vote_average}</h5>
          </div>
          <div id="movieDetailsOverview" className="col-lg-12 col-md-12">
            <h5>{this.state.data.overview}</h5>
          </div>
        </div>
      </div>
    );
  }
});
