/* jshint esnext: true */

let CreditMember = React.createClass({displayName: "CreditMember",
  render: function () {
    return (
      React.createElement("div", {className: "creditMember col-lg-5 col-md-3"}, 
        React.createElement("img", {className: "creditMemberPic", src: this.props.credit.picture}), 
        React.createElement("h5", null, React.createElement("b", null, this.props.credit.character)), 
        React.createElement("h5", null, this.props.credit.name)
      )
    );
  }
});

let CrewMember = React.createClass({displayName: "CrewMember",
  render: function () {
    return (
      React.createElement("div", {className: "crewMember col-lg-5 col-md-3"}, 
        React.createElement("h4", null, React.createElement("b", null, this.props.crew.name)), 
        React.createElement("h5", null, this.props.crew.job)
      )
    );
  }
});

let MovieDetailsContainer = React.createClass({displayName: "MovieDetailsContainer",
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
        React.createElement(CreditMember, {credit: credit})
      );
    });
    let crewArray = this.state.movieCrew.map(function (crew) {
      return (
        React.createElement(CrewMember, {crew: crew})
      );
    });
    return (
      React.createElement("div", {id: "movieDetailsContainer", className: "col-lg-12 col-md-12 col-xs-12 movie"}, 
        React.createElement("div", {id: "movieDetailsPoster", className: "col-lg-5 col-md-6"}, 
          React.createElement("img", {src: this.state.data.posterPath})
        ), 
        React.createElement("div", {id: "movieDetailsContent", className: "col-lg-7 col-md-6"}, 
          React.createElement("div", {id: "movieDetailsTitle", className: "col-lg-12 col-md-12"}, 
            React.createElement("h3", null, React.createElement("b", null, this.state.data.title))
          ), 
          React.createElement("div", {id: "movieDetailsYear", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, this.state.data.publishDate, " ", this.state.data.genre, "  ", React.createElement("b", null, this.state.data.vote_average), React.createElement("i", {className: "fa fa-star"}))
          ), 
          React.createElement("div", {id: "movieDetailsOverview", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, this.state.data.overview)
          ), 
          React.createElement("div", {id: "movieDetailsCredit", className: "col-lg-12 col-md-12"}, 
            creditsArray
          ), 
          React.createElement("div", {id: "movieDetailsCrew", className: "col-lg-12 col-md-12"}, 
            crewArray
          )
        )
      )
    );
  }
});
