/* jshint esnext: true */

let DiscoverActions = Reflux.createActions([
  'addMovieToStore',
  'oneMonthDiscoverBtnClicked',
  'threeMonthDiscoverBtnClicked',
  'tvTopRatedBtnClicked',
  'tvAiringBtnClicked',
  'removeContainer'
]);

let MyMoviesActions = Reflux.createActions([
  'loadMovieTitles',
  'loadMovies',
  'addMovieToMyList',
  'removeMovieFromDb',
  'addMovieToDb'
]);

let MovieDetailsActions = Reflux.createActions([
  'loadMovieData',
  'loadCredtisData',
  'loadVideos',
  'addMovieData',
  'addCreditsData',
  'addVideoUrl'
]);

let TvShowDetailsActions = Reflux.createActions([
  'loadMovieData',
  'loadCredtisData',
  'loadVideos',
  'addMovieData',
  'addCreditsData',
  'addVideoUrl'
]);
