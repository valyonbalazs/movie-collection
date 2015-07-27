var movieListData = [
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

var Poster = React.createClass({
  render: function() {
    var posterPath = this.props.path;
    return (
      <div className="col-md-2 poster">
        <img src={posterPath} />
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
    var title = this.props.data.title;
    var description = this.props.data.description;
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
        <Rating rating={this.props.rating} />
        <PublishYear year={this.props.year} />
      </div>
    );
  }
});

var DetailsContainer = React.createClass({
  render: function() {
    var movieData = this.props.data;
    return(
      <div className="col-md-12 detailsContainer">
        <Poster path={movieData.poster} />
        <TextContainer data={movieData} />
        <RatingYearContainer rating={movieData.rating} year={movieData.year}/>
      </div>
    );
  }
});

var Backdrop = React.createClass({
  render: function() {
    var backdropPath = this.props.backdrop;
    return(
      <div className="col-md-12 backdrop">
        <img src={backdropPath} />
      </div>
    )
  }
});

var Movie = React.createClass({
  render: function() {
    return(
      <div className="col-md-6 movie">
        <Backdrop backdrop={this.props.movie.backdrop} />
        <DetailsContainer data={this.props.movie}/>
      </div>
    );
  }
});

var MoviesContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.setState({data: movieListData});
  },
  render: function () {
      //var movieNodes = this.props.movies.map(function (movie) {
      var moviesArray = this.state.data.map(function (movie) {
        return ( 
          <Movie movie={movie} />
        );
      });

      return (
        <div className="col-md-12 moviesContainer" >
          {moviesArray}
        </div>
      );
  }
});

React.render(<MoviesContainer />, document.getElementById("innerContainer"));
