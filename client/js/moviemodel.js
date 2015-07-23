/*jshint esnext: true */

class Movie {
  constructor(title, overview, rating, publishDate, backdropPath, posterPath) {
    this.title = title;
    this.overview = overview;
    this.rating = rating;
    this.publishDate = publishDate;
    this.backdropPath = backdropPath;
    this.posterPath = posterPath;
  }

  getTitle() {
    return this.title;
  }

}

var movie = new Movie('star wars', 'overview', 7.2, '2005', '/gnavakvkla.jph', '/cvsacsa.jpg');
