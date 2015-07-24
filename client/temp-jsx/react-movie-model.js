var Poster = React.createClass({displayName: "Poster",
  render: function() {
    return (
      React.createElement("div", {className: "col-md-2 poster"}, 
        React.createElement("img", {src: "http://image.tmdb.org/t/p/w500/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg"})
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
    return(
      React.createElement("div", {className: "col-md-7 textContainer"}, 
        React.createElement(Title, {title: "Star Wars Episode IV."}), 
        React.createElement(Description, {description: "Star wars description"})
      )
    );
  }
});

var Rating = React.createClass({displayName: "Rating",
  render: function() {
    return(
      React.createElement("h3", {className: "rating"}, this.props.rating)
    );
  }
});

var PublishYear = React.createClass({displayName: "PublishYear",
  render: function() {
    return(
      React.createElement("h3", {className: "publishYear"}, this.props.year)
    );
  }
});

var RatingYearContainer = React.createClass({displayName: "RatingYearContainer",
  render: function(){
    return(
      React.createElement("div", {className: "col-md-2 ratingYearContainer"}, 
        React.createElement(Rating, {rating: "8"}), 
        React.createElement(PublishYear, {year: "1980"})
      )
    );
  }
});

var DetailsContainer = React.createClass({displayName: "DetailsContainer",
  render: function() {
    return(
      React.createElement("div", {className: "col-md-12 detailsContainer"}, 
        React.createElement(Poster, null), 
        React.createElement(TextContainer, null), 
        React.createElement(RatingYearContainer, null)
      )
    );
  }
});

var Backdrop = React.createClass({displayName: "Backdrop",
  render: function() {
    return(
      React.createElement("div", {className: "col-md-12 backdrop"}, 
        React.createElement("img", {src: "http://image.tmdb.org/t/p/w500/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg"})
      )
    )
  }
});

var Movie = React.createClass({displayName: "Movie",
  render: function() {
    return(
      React.createElement("div", {className: "col-md-6 movie"}, 
        React.createElement(Backdrop, null), 
        React.createElement(DetailsContainer, null)
      )
    )
  }
});

React.render(React.createElement(Movie, null), document.getElementById("innerContainer"));
