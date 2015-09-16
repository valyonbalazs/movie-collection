/* jshint esnext: true */

let DiscoverActions = Reflux.createActions([
  'addMovieToStore',
  'oneMonthDiscoverBtnClicked',
  'threeMonthDiscoverBtnClicked',
  'removeContainer'
]);

let MyMoviesActions = Reflux.createActions([
  'loadMovieTitles',
  'loadMovies',
  'addMovieToMyList',
  'removeMovieFromDb',
  'addMovieToDb'
]);
