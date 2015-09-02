/* jshint esnext: true */
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
    starterMovieTitles = [];
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          let data = snapshot.val();
          for (let i in data) {
            starterMovieTitles.push(data[i].title);
          }
          resolve(function () { });
        });
      });
    };

    let context = this;
    promise().then(function () {
      for (var key in starterMovieTitles) {
        let title = starterMovieTitles[key];
        http.ajax(movies.createMovieUrl(title))
          .get()
          .then(http.success.bind(context));
      }
    });
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
