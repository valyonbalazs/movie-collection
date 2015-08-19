var starterMovieTitles = [
  {title: "blade runner"},
  {title: "avengers"},
  {title: "batman"},
  {title: "star wars episode iv"}
];
/*var starterMovieTitles = [
  {title: "blade runner"}
];*/

var movieListData = [];

var Poster = React.createClass({
  render: function() {
    var posterPath = this.props.path;
    return (
      <div className="col-md-2 col-xs-3 poster">
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
      <div className="col-md-8 col-xs-9 textContainer">
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
      <div className="col-md-2 col-xs-3 ratingYearContainer">
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
      <div className="col-md-12 col-xs-12 detailsContainer">
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
      <div className="col-md-12 col-xs-12 backdrop">
        <img src={backdropPath} />
      </div>
    )
  }
});

var Movie = React.createClass({
  render: function() {
    return(
      <div className="col-md-6 col-xs-12 movie">
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
     this.loadMovies();
  },
  loadMovies: function() {
    movieListData = [];
    for (var key in starterMovieTitles) {
      var title = starterMovieTitles[key].title;
      this.ajax(movies.createMovieUrl(title))
        .get()
        .then(this.success);
    }
  },
  ajax: function(url) {
    var core = {
      ajax: function(method, url, args) {
        var promise = new Promise(function(resolve, reject) {
          var client = new XMLHttpRequest();
          var uri = url;
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
    var movieData;
    movieData = JSON.parse(data);
    var bestVoted = movies.getMaxVotedElement(movieData);
    var title = movies.modifyTitle(bestVoted.title);
    var backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    var posterPath = movies.createImageUrl(bestVoted.poster_path);
    var overview = movies.modifyOverview(bestVoted.overview);
    var releaseDate = movies.modifyReleaseDate(bestVoted.release_date);
    var movie = new MovieElement(
      title,
      overview,
      bestVoted.vote_average,
      releaseDate,
      backdropPath,
      posterPath
    );
    movieListData.push(movie);
    this.setState({data: movieListData});
  },
  render: function () {
      console.log(this.state.data);
      var moviesArray = this.state.data.map(function (movie) {
        return (
          <Movie movie={movie} />
        );
      });

      return (
        <div className="col-md-12 col-xs-12 moviesContainer" >
          {moviesArray}
        </div>
      );
  }
});

React.render(<MoviesContainer />, document.getElementById("innerContainer"));
