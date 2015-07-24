var Poster = React.createClass({
  render: function() {
    return (
      <div className="col-md-2 poster">
        <img src="http://image.tmdb.org/t/p/w500/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg" />
      </div>
    );
  }
});

var Title = React.createClass({
  render: function() {
    return(
      <h3 className="title">{this.props.title}</h3>
    );
  }
});

var Description = React.createClass({
  render: function() {
    return(
      <h5 className="description">{this.props.description}</h5>
    );
  }
});

var TextContainer = React.createClass({
  render: function() {
    return(
      <div className="col-md-7 textContainer">
        <Title title="Star Wars Episode IV." />
        <Description description="Star wars description" />
      </div>
    );
  }
});

var Rating = React.createClass({
  render: function() {
    return(
      <h3 className="rating">{this.props.rating}</h3>
    );
  }
});

var PublishYear = React.createClass({
  render: function() {
    return(
      <h3 className="publishYear">{this.props.year}</h3>
    );
  }
});

var RatingYearContainer = React.createClass({
  render: function(){
    return(
      <div className="col-md-2 ratingYearContainer">
        <Rating rating="8"/>
        <PublishYear year="1980"/>
      </div>
    );
  }
});

var DetailsContainer = React.createClass({
  render: function() {
    return(
      <div className="col-md-12 detailsContainer">
        <Poster />
        <TextContainer />
        <RatingYearContainer />
      </div>
    );
  }
});

var Backdrop = React.createClass({
  render: function() {
    return(
      <div className="col-md-12 backdrop">
        <img src="http://image.tmdb.org/t/p/w500/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg" />
      </div>
    )
  }
});

var Movie = React.createClass({
  render: function() {
    return(
      <div className="col-md-6 movie">
        <Backdrop />
        <DetailsContainer />
      </div>
    )
  }
});

React.render(<Movie />, document.getElementById("innerContainer"));
