var data = [
  { title: "Star Wars Episode IV",
    description: "the new hope",
    poster: "http://image.tmdb.org/t/p/w500/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg",
    backdrop: "http://image.tmdb.org/t/p/w500/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg",
    rating: "8.1",
    year: "1977"
  }
];

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
    var title = "hello";
    var description = "";
    return(
      <div className="col-md-7 textContainer">
        <Title title={title} />
        <Description description={description} />
      </div>
    );
  }
});

var Rating = React.createClass({
  render: function() {
    return(
      <h3 className="rating">
        {this.props.rating}
        <i className="fa fa-star"></i>
      </h3>
    );
  }
});

var PublishYear = React.createClass({
  render: function() {
    return(
      <h3 className="publishYear">
        {this.props.year}
        <i className="fa fa-calendar"></i>
      </h3>
    );
  }
});

var RatingYearContainer = React.createClass({
  render: function(){
    return(
      <div className="col-md-2 ratingYearContainer">
        <Rating />
        <PublishYear />
      </div>
    );
  }
});

var DetailsContainer = React.createClass({
  render: function() {
    var movieData = {this.props.data}
    return(
      <div className="col-md-12 detailsContainer">
        <Poster />
        <TextContainer data={movieData} />
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
        <DetailsContainer data={this.props.data}/>
      </div>
    )
  }
});

React.render(<Movie data={data} />, document.getElementById("innerContainer"));
