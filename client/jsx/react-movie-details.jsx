/* jshint esnext: true */

let CreditMember = React.createClass({
  render: function () {
    return (
      <div className="creditMember col-lg-5 col-md-3">
        <img className="creditMemberPic" src={this.props.credit.picture} />
        <h5><b>{this.props.credit.character}</b></h5>
        <h5>{this.props.credit.name}</h5>
      </div>
    );
  }
});

let CrewMember = React.createClass({
  render: function () {
    return (
      <div className="crewMember col-lg-5 col-md-3">
        <h4><b>{this.props.crew.name}</b></h4>
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
        <div id="movieDetailsPoster" className="col-lg-5 col-md-6">
          <img src={this.state.data.posterPath} />
        </div>
        <div id="movieDetailsContent" className="col-lg-7 col-md-6">
          <div id="movieDetailsTitle" className="col-lg-12 col-md-12">
            <h3><b>{this.state.data.title}</b></h3>
          </div>
          <div id="movieDetailsYear" className="col-lg-12 col-md-12">
            <h5>{this.state.data.publishDate} {this.state.data.genre}  <b>{this.state.data.vote_average}</b><i className="fa fa-star"></i></h5>
          </div>
          <div id="movieDetailsOverview" className="col-lg-12 col-md-12">
            <h5>{this.state.data.overview}</h5>
          </div>
          <div id="movieDetailsCredit" className="col-lg-12 col-md-12">
            {creditsArray}
          </div>
          <div id="movieDetailsCrew" className="col-lg-12 col-md-12">
            {crewArray}
          </div>
        </div>
      </div>
    );
  }
});
