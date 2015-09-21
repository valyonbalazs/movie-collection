/* jshint esnext: true */

let CreditMember = React.createClass({
  render: function () {
    return (
      <div className="creditMember">
        <img className="creditMemberPic" src={this.props.credit.picture} />
        <h4>{this.props.credit.character}</h4>
        <h5>{this.props.credit.name}</h5>
      </div>
    );
  }
});

let MovieDetailsContainer = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      movieCredits: [],
      movieCrew: []
    };
  },
  componentDidMount: function () {
    let context = this;
    let id = this.props.params.id;
    MovieDetailsActions.loadMovieData(id, context);
    MovieDetailsActions.loadCredtisData(id, context);
  },
  render: function () {
    let creditsArray = this.state.movieCredits.map(function (credit) {
      return (
        <CreditMember credit={credit} />
      );
    });
    return (
      <div id="movieDetailsContainer" className="col-lg-12 col-md-12 col-xs-12 movie">
        <div id="movieDetailsPoster" className="col-lg-6 col-md-6">
          <img src={this.state.data.posterPath} />
        </div>
        <div id="movieDetailsContent" className="col-lg-6 col-md-6">
          <div id="movieDetailsTitleAndYear" className="col-lg-12 col-md-12">
            <h3>{this.state.data.title}</h3>
            <h5>{this.state.data.publishDate}</h5>
            <h5>{this.state.data.genre}  {this.state.data.vote_average}</h5>
          </div>
          <div id="movieDetailsOverview" className="col-lg-12 col-md-12">
            <h5>{this.state.data.overview}</h5>
          </div>
          <div id="movieDetailsCrew" className="col-lg-12 col-md-12">
            {creditsArray}
          </div>
        </div>
      </div>
    );
  }
});
