/* jshint esnext: true */

let CreditMember = React.createClass({displayName: "CreditMember",
  render: function () {
    return (
        React.createElement("tr", {className: "creditMember"}, 
          React.createElement("td", null, 
            React.createElement("img", {className: "creditMemberPic", src: this.props.credit.picture})
          ), 
          React.createElement("td", null, 
            React.createElement("h5", null, React.createElement("b", null, this.props.credit.character))
          ), 
          React.createElement("td", null, 
            React.createElement("h5", null, this.props.credit.name)
          )
        )
    );
  }
});

let CrewMember = React.createClass({displayName: "CrewMember",
  render: function () {
    return (
        React.createElement("tr", {className: "crewMember"}, 
          React.createElement("td", null, 
            React.createElement("h4", null, React.createElement("b", null, this.props.crew.name))
          ), 
          React.createElement("td", null, 
            React.createElement("h5", null, this.props.crew.job)
          )
        )
    );
  }
});

let MovieDetailsContainer = React.createClass({displayName: "MovieDetailsContainer",
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
            React.createElement("h3", null, React.createElement("b", null, this.state.data.title), " (", this.state.data.publishDate, ")")
          ), 
          React.createElement("div", {id: "movieDetailsYear", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, this.state.data.genre, "  ", React.createElement("b", null, this.state.data.vote_average), React.createElement("i", {className: "fa fa-star"}))
          ), 
          React.createElement("div", {id: "movieDetailsOverview", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, this.state.data.overview)
          ), 
          React.createElement("div", {id: "movieDetailsCredit", className: "col-lg-6 col-md-6"}, 
            React.createElement("table", null, 
              React.createElement("tbody", null, 
                creditsArray
              )
            )
          ), 
          React.createElement("div", {id: "movieDetailsCrew", className: "col-lg-6 col-md-6"}, 
            React.createElement("div", {className: "col-lg-12 col-md-12"}, 
              React.createElement("table", null, 
                React.createElement("tbody", null, 
                  crewArray
                )
              )
            ), 
            React.createElement("div", {className: "col-lg-12 col-md-12"}, 
              React.createElement("iframe", {id: "youtubeTrailerHigh", width: "300", height: "169", src: this.state.video, frameborder: "0", allowfullscreen: true}), 
              React.createElement("iframe", {id: "youtubeTrailerMedium", width: "212", height: "119", src: this.state.video, frameborder: "0", allowfullscreen: true})
            )
          ), 
          React.createElement("div", {id: "movieDetailsHomepage", className: "col-lg-12 col-md-12"}, 
            React.createElement("h5", null, React.createElement("a", {href: this.state.data.homePage}, this.state.data.homePage))
          )
        )
      )
    );
  }
});
