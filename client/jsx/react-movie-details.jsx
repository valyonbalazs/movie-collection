/* jshint esnext: true */

let CreditMember = React.createClass({
  render: function () {
    return (
        <tr className="creditMember">
          <td>
            <img className="creditMemberPic" src={this.props.credit.picture} />
          </td>
          <td>
            <h5><b>{this.props.credit.character}</b></h5>
          </td>
          <td>
            <h5>{this.props.credit.name}</h5>
          </td>
        </tr>
    );
  }
});

let CrewMember = React.createClass({
  render: function () {
    return (
        <tr className="crewMember">
          <td>
            <h4><b>{this.props.crew.name}</b></h4>
          </td>
          <td>
            <h5>{this.props.crew.job}</h5>
          </td>
        </tr>
    );
  }
});

let MovieDetailsContainer = React.createClass({
  getInitialState: function () {
    return {
      data: [],
      movieCredits: [],
      movieCrew: [],
      video: ''
    };
  },
  componentDidMount: function () {
    let context = this;
    let id = this.props.params.id;
    MovieDetailsActions.loadMovieData(id, context);
    MovieDetailsActions.loadCredtisData(id, context);
    MovieDetailsActions.loadVideos(id, context);
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
          <div id="movieDetailsTitle" className="col-lg-12 col-md-12">
            <h3><b>{this.state.data.title}</b> ({this.state.data.publishDate})</h3>
          </div>
          <div id="movieDetailsYear" className="col-lg-12 col-md-12">
            <h5>{this.state.data.genre}  <b>{this.state.data.vote_average}</b><i className="fa fa-star"></i></h5>
          </div>
          <div id="movieDetailsOverview" className="col-lg-12 col-md-12">
            <h5>{this.state.data.overview}</h5>
          </div>
          <div id="movieDetailsCredit" className="col-lg-6 col-md-6">
            <table>
              <tbody>
                {creditsArray}
              </tbody>
            </table>
          </div>
          <div id="movieDetailsCrew" className="col-lg-6 col-md-6">
            <div className="col-lg-12 col-md-12">
              <table>
                <tbody>
                  {crewArray}
                </tbody>
              </table>
            </div>
            <div className="col-lg-12 col-md-12">
              <iframe id="youtubeTrailerHigh" width="300" height="169" src={this.state.video} frameborder="0" allowfullscreen></iframe>
              <iframe id="youtubeTrailerMedium" width="250" height="141" src={this.state.video} frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          <div id="movieDetailsHomepage" className="col-lg-12 col-md-12">
            <h5><a href={this.state.data.homePage}>{this.state.data.homePage}</a></h5>
          </div>
        </div>
      </div>
    );
  }
});
