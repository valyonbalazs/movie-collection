/* jshint esnext: true */
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let Poster = React.createClass({displayName: "Poster",
  render: function() {
    let posterPath = this.props.path;
    return (
      React.createElement("div", {className: "col-lg-2 col-md-2 col-xs-3 poster"}, 
        React.createElement("img", {src: posterPath})
      )
    );
  }
});

let Title = React.createClass({displayName: "Title",
  render: function() {
    return(
      React.createElement("h3", {className: "title"}, this.props.title)
    );
  }
});

let Description = React.createClass({displayName: "Description",
  render: function() {
    return(
      React.createElement("h5", {className: "description"}, this.props.description)
    );
  }
});

let TextContainer = React.createClass({displayName: "TextContainer",
  render: function() {
    let title = this.props.data.title;
    let description = this.props.data.description;
    return(
      React.createElement("div", {className: "col-lg-8 col-md-8 col-xs-9 textContainer"}, 
        React.createElement(Title, {title: title}), 
        React.createElement(Description, {description: description})
      )
    );
  }
});

let Rating = React.createClass({displayName: "Rating",
  render: function() {
    return(
      React.createElement("h3", {className: "rating"}, 
        this.props.rating, 
        React.createElement("i", {className: "fa fa-star"})
      )
    );
  }
});

let PublishYear = React.createClass({displayName: "PublishYear",
  render: function() {
    return(
      React.createElement("h3", {className: "publishYear"}, 
        this.props.year, 
        React.createElement("i", {className: "fa fa-calendar"})
      )
    );
  }
});

let RatingYearContainer = React.createClass({displayName: "RatingYearContainer",
  render: function(){
    return(
      React.createElement("div", {className: "col-lg-2 col-md-2 col-xs-3 ratingYearContainer"}, 
        React.createElement(Rating, {rating: this.props.rating}), 
        React.createElement(PublishYear, {year: this.props.year})
      )
    );
  }
});

let DetailsContainer = React.createClass({displayName: "DetailsContainer",
  render: function() {
    let movieData = this.props.data;
    return(
      React.createElement("div", {className: "col-lg-12 col-md-12 col-xs-12 detailsContainer"}, 
        React.createElement(Poster, {path: movieData.poster}), 
        React.createElement(TextContainer, {data: movieData}), 
        React.createElement(RatingYearContainer, {rating: movieData.rating, year: movieData.year})
      )
    );
  }
});

let Backdrop = React.createClass({displayName: "Backdrop",
  render: function() {
    let backdropPath = this.props.backdrop;
    return(
      React.createElement("div", {className: "col-lg-12 col-md-12 col-xs-12 backdrop"}, 
        React.createElement("img", {src: backdropPath})
      )
    )
  }
});

let Movie = React.createClass({displayName: "Movie",
  render: function() {
    return(
      React.createElement("div", {className: "col-lg-4 col-md-6 col-xs-12 movie"}, 
        React.createElement(Backdrop, {backdrop: this.props.movie.backdrop}), 
        React.createElement(DetailsContainer, {data: this.props.movie})
      )
    );
  }
});

let MoviesContainer = React.createClass({displayName: "MoviesContainer",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
     this.loadMovies();
  },
  loadMovies: function() {
    let context = this;
    let wasItUsed = false;
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          console.log("betolt");
          ownMovieTitleList = [];
          movieListData = [];
          let data = snapshot.val();
          for (let i in data) {
            ownMovieTitleList.push(data[i].title);
          }
          console.log("betolt2");
          if(wasItUsed === true) {
            for (var key in ownMovieTitleList) {
              let title = ownMovieTitleList[key];
              http.ajax(movies.createMovieUrl(title))
                .get()
                .then(http.success.bind(context));
            }
          }
          resolve(function () { });
        });
      });
    };

    promise().then(function () {
      wasItUsed = true;
      console.log("promise then-ben");
      for (var key in ownMovieTitleList) {
        let title = ownMovieTitleList[key];
        http.ajax(movies.createMovieUrl(title))
          .get()
          .then(http.success.bind(context));
      }
    });
  },
  render: function () {
      let moviesArray = this.state.data.map(function (movie) {
        return (
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {className: "col-lg-12 col-md-12 col-xs-12 moviesContainer"}, 
          React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
            moviesArray
          )
        )
      );
  }
});

function renderElements() {
  React.render(React.createElement(MoviesContainer, null), document.getElementById("innerContainer"));
};
