/*jshint esnext: true */
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
    movieListData = [];
    for (var key in starterMovieTitles) {
      let title = starterMovieTitles[key].title;
      this.ajax(movies.createMovieUrl(title))
        .get()
        .then(this.success);
    }
  },
  ajax: function(url) {
    let core = {
      ajax: function(method, url, args) {
        let promise = new Promise(function(resolve, reject) {
          let client = new XMLHttpRequest();
          let uri = url;
          if (method === "GET") {
            client.open(method, uri);
            client.send();
            client.onload = function() {
              if (this.status == 200) {
                resolve(this.response);
              } else {
                reject(this.statusText);
              }
            };
            client.onerror = function() {
              reject(this.statusText);
            };
          }
        });
        return promise;
      }
    };

    return {
      'get': function(args) {
        return core.ajax('GET', url, args);
      }
    };
  },
  success: function(data) {
    let movieData;
    movieData = JSON.parse(data);
    let bestVoted = movies.getMaxVotedElement(movieData);
    let title = movies.modifyTitle(bestVoted.title);
    let backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    let posterPath = movies.createImageUrl(bestVoted.poster_path);
    let overview = movies.modifyOverview(bestVoted.overview);
    let releaseDate = movies.modifyReleaseDate(bestVoted.release_date);
    let average = bestVoted.vote_average + ' ';
    let movie = new MovieElement(
      title,
      overview,
      average,
      releaseDate,
      backdropPath,
      posterPath
    );
    movieListData.push(movie);
    this.setState({data: movieListData});
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
