/* jshint esnext: true */

'use strict';

describe('Testing movieElement helper methods', function () {
  describe('Testing createImgUrl method', function () {
    it('creates a valid URL for the Image of the movie', function () {
      let urlEndPart = '/sLbXneTErDvS3HIjqRWQJPiZ4Ci.jpg';
      let urlFirstPart = 'http://image.tmdb.org/t/p/w500';
      let expectedResult = urlFirstPart + urlEndPart;
      let gotResult = movies.createImageUrl(urlEndPart);

      expect(expectedResult).to.equal(gotResult);
    });

    it('input validation if not string', function () {
      let input = new Date();

      assert.throws(function () { movies.createImageUrl(input); }, Error, 'Input type is not string!');
    });
  });

  describe('Testing createMovieUrl method', function () {
    it('creates a valid Movie URL with specific API key and query params', function () {
      let movieTitle = 'star wars episode iv';
      let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
      let urlFirstPart = 'https://api.themoviedb.org/3/search/movie?query=';
      let expectedResult = urlFirstPart + movieTitle + api_key;
      let gotResult = movies.createMovieUrl(movieTitle);

      expect(expectedResult).to.equal(gotResult);
    });

    it('input validation if not string', function () {
      let input = new Date();

      assert.throws(function () { movies.createMovieUrl(input); }, Error, 'Input type is not string!');
    });
  });

  describe('Testing modifyOverview method', function () {
    it('shortens the original movie overview to 130 characters', function () {
      let originalOverview = 'Driven by tragedy, billionaire Bruce Wayne dedicates his' +
       'life to uncovering and defeating the corruption that plagues his home, Gotham City.' +
       ' Unable to work within the system, he instead creates a new identity, a symbol of fear' +
       'for the criminal underworld - The Batman.';
      let expectedResult = originalOverview.substr(0, 130) + '...';
      let gotResult = movies.modifyOverview(originalOverview);

      expect(expectedResult).to.equal(gotResult);
    });

    it('input validation if not string', function () {
      let input = new Date();

      assert.throws(function () { movies.modifyOverview(input); }, Error, 'Input type is not string!');
    });
  });

  describe('Testing modifyReleaseDate method', function () {
    it('shortens the original release date to only 4 characters year', function () {
      let releaseDate = '2015.09.08.';
      let expectedResult = releaseDate.substr(0, 4) + ' ';
      let gotResult = movies.modifyReleaseDate(releaseDate);

      expect(expectedResult).to.equal(gotResult);

    });
  });

  describe('Testing modifyTitle method', function () {
    it('shortens the original title  to only 20 characters', function () {
      let title = 'Avengers - Age of Ultron';
      let expectedResult = title.substr(0, 20);
      let gotResult = movies.modifyTitle(title);

      expect(expectedResult).to.equal(gotResult);

    });
  });

  describe('Testing create1MonthDiscoverUrl method', function () {
    it('modifies the query url for the last month with the actual date', function () {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = '01';
      let insertableDate = year + '-' + month + '-' + day;
      let api_key = '&api_key=4a8dce0b18b88827ffbc32dee5b66838';
      let urlFirstPart = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2015&release_date.gte=' +
                          insertableDate + '&sort_by=popularity.desc&';
      let expectedResult = urlFirstPart + api_key;
      let gotResult = movies.create1MonthDiscoverUrl();

      expect(expectedResult).to.equal(gotResult);

    });
  });
});
