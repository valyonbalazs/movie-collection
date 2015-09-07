/* jshint esnext: true */

var assert = require('assert');
var expect = require('chai').expect;
var movieModel = require('../../client/js/movieModel');

describe('Testing movieElement helper methods', function () {
  describe('Testing createImgUrl method', function () {
    it('creates a valid URL for the Image of the movie', function () {
      var urlEndPart = '/sLbXneTErDvS3HIjqRWQJPiZ4Ci.jpg';
      var urlFirstPart = 'http://image.tmdb.org/t/p/w500';
      var resultUrl = urlFirstPart + urlEndPart;
      var gotResult = movieModel.movies.createImageUrl(urlEndPart);

      expect(resultUrl).to.equal(gotResult);

    });
  });

  describe('Testing createMovieUrl method', function () {
    it('creates a valid Movie URL with specific API key and query params', function () {

    });
  });
});
