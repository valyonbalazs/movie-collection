var data = [
  { title: "Star Wars Episode IV",
    description: "the new hope",
    poster: "http://image.tmdb.org/t/p/w500/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg",
    backdrop: "http://image.tmdb.org/t/p/w500/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    rating: "8.1",
    year: "1977"
  },
  { title: "Star Wars Episode V",
    description: "the empire strikes back",
    poster: "http://image.tmdb.org/t/p/w500/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg",
    backdrop: "http://image.tmdb.org/t/p/w500/AkE7LQs2hPMG5tpWYcum847Knre.jpg",
    rating: "7.9",
    year: "1980"
  }
];

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
      React.createElement("div", {className: "col-md-8  textContainer"}, 
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
  render: function () {
      var movieNodes = this.props.movies.map(function (movie) {
        return (
          React.createElement(Movie, {movie: movie})
        );
      });

      return (
        React.createElement("div", {className: "col-md-12 moviesContainer"}, 
          movieNodes
        )
      );
  }
});

React.render(React.createElement(MoviesContainer, {movies: data}), document.getElementById("innerContainer"));
