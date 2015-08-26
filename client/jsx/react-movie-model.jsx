/*jshint esnext: true */
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let Poster = React.createClass({
  render: function() {
    let posterPath = this.props.path;
    return (
      <div className="col-lg-2 col-md-2 col-xs-3 poster">
        <img src={posterPath} />
      </div>
    );
  }
});

let Title = React.createClass({
  render: function() {
    return(
      <h3 className="title">{this.props.title}</h3>
    );
  }
});

let Description = React.createClass({
  render: function() {
    return(
      <h5 className="description">{this.props.description}</h5>
    );
  }
});

let TextContainer = React.createClass({
  render: function() {
    let title = this.props.data.title;
    let description = this.props.data.description;
    return(
      <div className="col-lg-8 col-md-8 col-xs-9 textContainer">
        <Title title={title} />
        <Description description={description} />
      </div>
    );
  }
});

let Rating = React.createClass({
  render: function() {
    return(
      <h3 className="rating">
        {this.props.rating}
        <i className="fa fa-star"></i>
      </h3>
    );
  }
});

let PublishYear = React.createClass({
  render: function() {
    return(
      <h3 className="publishYear">
        {this.props.year}
        <i className="fa fa-calendar"></i>
      </h3>
    );
  }
});

let RatingYearContainer = React.createClass({
  render: function(){
    return(
      <div className="col-lg-2 col-md-2 col-xs-3 ratingYearContainer">
        <Rating rating={this.props.rating} />
        <PublishYear year={this.props.year} />
      </div>
    );
  }
});

let DetailsContainer = React.createClass({
  render: function() {
    let movieData = this.props.data;
    return(
      <div className="col-lg-12 col-md-12 col-xs-12 detailsContainer">
        <Poster path={movieData.poster} />
        <TextContainer data={movieData} />
        <RatingYearContainer rating={movieData.rating} year={movieData.year}/>
      </div>
    );
  }
});

let Backdrop = React.createClass({
  render: function() {
    let backdropPath = this.props.backdrop;
    return(
      <div className="col-lg-12 col-md-12 col-xs-12 backdrop">
        <img src={backdropPath} />
      </div>
    )
  }
});

let Movie = React.createClass({
  render: function() {
    return(
      <div className="col-lg-4 col-md-6 col-xs-12 movie">
        <Backdrop backdrop={this.props.movie.backdrop} />
        <DetailsContainer data={this.props.movie}/>
      </div>
    );
  }
});

let MoviesContainer = React.createClass({
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
    let movie = new MovieElement(
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
      let moviesArray = this.state.data.map(function (movie) {
        return (
          <Movie movie={movie} />
        );
      });

      return (
        <div className="col-lg-12 col-md-12 col-xs-12 moviesContainer" >
          <ReactCSSTransitionGroup transitionName="example">
            {moviesArray}
          </ReactCSSTransitionGroup>
        </div>
      );
  }
});


function renderElements() {
  React.render(<MoviesContainer />, document.getElementById("innerContainer"));
};
