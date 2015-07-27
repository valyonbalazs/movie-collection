var movieListData = [];

var Poster = React.createClass({displayName: "Poster",
  render: function() {
    var posterPath = this.props.path;
    return (
      React.createElement("div", {className: "col-md-2 poster"}, 
        React.createElement("img", {src: posterPath})
      )
    );
  }
});

var Title = React.createClass({displayName: "Title",
  render: function() {
    return(
      React.createElement("h3", {className: "title"}, this.props.title)
    );
  }
});

var Description = React.createClass({displayName: "Description",
  render: function() {
    return(
      React.createElement("h5", {className: "description"}, this.props.description)
    );
  }
});

var TextContainer = React.createClass({displayName: "TextContainer",
  render: function() {
    var title = this.props.data.title;
    var description = this.props.data.description;
    return(
      React.createElement("div", {className: "col-md-7 textContainer"}, 
        React.createElement(Title, {title: title}), 
        React.createElement(Description, {description: description})
      )
    );
  }
});

var Rating = React.createClass({displayName: "Rating",
  render: function() {
    return(
      React.createElement("h3", {className: "rating"}, 
        this.props.rating, 
        React.createElement("i", {className: "fa fa-star"})
      )
    );
  }
});

var PublishYear = React.createClass({displayName: "PublishYear",
  render: function() {
    return(
      React.createElement("h3", {className: "publishYear"}, 
        this.props.year, 
        React.createElement("i", {className: "fa fa-calendar"})
      )
    );
  }
});

var RatingYearContainer = React.createClass({displayName: "RatingYearContainer",
  render: function(){
    return(
      React.createElement("div", {className: "col-md-2 ratingYearContainer"}, 
        React.createElement(Rating, {rating: this.props.rating}), 
        React.createElement(PublishYear, {year: this.props.year})
      )
    );
  }
});

var DetailsContainer = React.createClass({displayName: "DetailsContainer",
  render: function() {
    var movieData = this.props.data;
    return(
      React.createElement("div", {className: "col-md-12 detailsContainer"}, 
        React.createElement(Poster, {path: movieData.poster}), 
        React.createElement(TextContainer, {data: movieData}), 
        React.createElement(RatingYearContainer, {rating: movieData.rating, year: movieData.year})
      )
    );
  }
});

var Backdrop = React.createClass({displayName: "Backdrop",
  render: function() {
    var backdropPath = this.props.backdrop;
    return(
      React.createElement("div", {className: "col-md-12 backdrop"}, 
        React.createElement("img", {src: backdropPath})
      )
    )
  }
});

var Movie = React.createClass({displayName: "Movie",
  render: function() {
    return(
      React.createElement("div", {className: "col-md-6 movie"}, 
        React.createElement(Backdrop, {backdrop: this.props.movie.backdrop}), 
        React.createElement(DetailsContainer, {data: this.props.movie})
      )
    );
  }
});

var MoviesContainer = React.createClass({displayName: "MoviesContainer",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
     setInterval(this.loadMovies,2000);
     this.setState({data: movieListData});
  }, 
  loadMovies: function() {
    var movieList = [
      {title: "star wars episode iv"},
      {title: "avengers"}
    ];

    for(var key in movieList) {
      callback.title = movieList[key].title;
      http(movies.createMovieUrl(callback.title))
        .get()
        .then(callback.success)
        .catch(callback.error);
    }
    this.setState({data: movieListData});
  },
  render: function () {
      console.log(this.state.data);
      var moviesArray = this.state.data.map(function (movie) {
        return (
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {className: "col-md-12 moviesContainer"}, 
          moviesArray
        )
      );
  }
});

React.render(React.createElement(MoviesContainer, null), document.getElementById("innerContainer"));
