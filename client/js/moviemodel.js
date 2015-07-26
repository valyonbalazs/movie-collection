/*jshint esnext: true */

class MovieElement {
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

  getOverview() {
    return this.overview;
  }

  getRating() {
    return this.rating;
  }

  getPublishDate() {
    return this.publishDate;
  }

  getBackdropPath() {
    return this.backdropPath;
  }

  getPosterPath() {
    return this.posterPath;
  }
}

var moviesData = [];

var movies = {
  getMovie: function (movieName) {
    var movieData;
    var xmlhttp = new XMLHttpRequest();
    var api_key = "&api_key=4a8dce0b18b88827ffbc32dee5b66838";
    var urlFirstPart = "https://api.themoviedb.org/3/search/movie?query=";
    var url = urlFirstPart + movieName + api_key;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
         if(xmlhttp.status == 200){
             movieData = JSON.parse(xmlhttp.responseText);
             var bestVoted = movies.getMaxVotedElement(movieData, movieName);
             var backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
             var posterPath = movies.createImageUrl(bestVoted.poster_path);
             var movie = new MovieElement(
               bestVoted.title,
               bestVoted.overview,
               bestVoted.vote_average,
               bestVoted.release_date,
               backdropPath,
               posterPath
             );
             moviesData.push(movie);
         }
         else if(xmlhttp.status == 400) {
            console.log("ERROR: status message 400");
         }
         else {
             console.log("ERROR: status is: " + xmlhttp.status);
         }
      }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },
  getMaxVotedElement: function (moviesResult, movieTitle) {
    var result = moviesResult.results;
    var maxVoted;
    var voteCount = 0;
    for(var key in result) {
      var item = result[key];
      if((item !== null) && (item.hasOwnProperty("vote_count"))) {
        if(parseInt(item.vote_count) > voteCount) {
          voteCount = item.vote_count;
          maxVoted = item;
        }
      }
    }
    return maxVoted;
  },
  createImageUrl: function (endOfTheUrl) {
    var url = "http://image.tmdb.org/t/p/w500" + endOfTheUrl;
    return url;
  }
};

(function() {


}());
