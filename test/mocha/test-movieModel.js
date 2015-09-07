/* jshint esnext: true */

let assert = require('assert');
let expect = require('chai').expect;
let movieModel = require('../../client/js/movieModel');

describe('Testing movieElement helper methods', function () {
  describe('Testing createImgUrl method', function () {
    it('creates a valid URL for the Image of the movie', function () {
      let urlEndPart = '/sLbXneTErDvS3HIjqRWQJPiZ4Ci.jpg';
      let urlFirstPart = 'http://image.tmdb.org/t/p/w500';
      let expectedResult = urlFirstPart + urlEndPart;
      let gotResult = movieModel.movies.createImageUrl(urlEndPart);

      expect(expectedResult).to.equal(gotResult);

    });
  });

  describe('Testing createMovieUrl method', function () {
    it('creates a valid Movie URL with specific API key and query params', function () {
      let movieTitle = 'star wars episode iv';
      let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
      let urlFirstPart = 'https://api.themoviedb.org/3/search/movie?query=';
      let expectedResult = urlFirstPart + movieTitle + api_key;
      let gotResult = movieModel.movies.createMovieUrl(movieTitle);

      expect(expectedResult).to.equal(gotResult);

    });
  });

  describe('Testing modifyOverview method', function () {
    it('shortens the original movie overview to 130 characters', function () {
        let originalOverview = 'Driven by tragedy, billionaire Bruce Wayne dedicates his' +
         'life to uncovering and defeating the corruption that plagues his home, Gotham City.' +
         ' Unable to work within the system, he instead creates a new identity, a symbol of fear' +
         'for the criminal underworld - The Batman.';
        let expectedResult = originalOverview.substr(0, 130) + '...';
        let gotResult = movieModel.movies.modifyOverview(originalOverview);

        expect(expectedResult).to.equal(gotResult);

    });
  });
});
