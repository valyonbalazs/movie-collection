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

let CrewMember = React.createClass({
  render: function () {
    return (
      <div className="crewMember col-lg-5 col-md-5">
        <h4>{this.props.crew.name}</h4>
        <h5>{this.props.crew.job}</h5>
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
    let crewArray = this.state.movieCrew.map(function (crew) {
      return (
        <CrewMember crew={crew} />
      );
    });
    return (
      <div id="movieDetailsContainer" className="col-lg-12 col-md-12 col-xs-12 movie">
        <div id="movieDetailsPoster" className="col-lg-5 col-md-5">
          <img src={this.state.data.posterPath} />
        </div>
        <div id="movieDetailsContent" className="col-lg-7 col-md-7">
          <div id="movieDetailsTitleAndYear" className="col-lg-12 col-md-12">
            <h3>{this.state.data.title}</h3>
            <h5>{this.state.data.publishDate}</h5>
            <h5>{this.state.data.genre}  {this.state.data.vote_average}</h5>
          </div>
          <div id="movieDetailsOverview" className="col-lg-12 col-md-12">
            <h5>{this.state.data.overview}</h5>
          </div>
          <div id="movieDetailsCrew" className="col-lg-12 col-md-12">
            {crewArray}
          </div>
          <div id="movieDetailsCredit" className="col-lg-12 col-md-12">
            {creditsArray}
          </div>
        </div>
      </div>
    );
  }
});
