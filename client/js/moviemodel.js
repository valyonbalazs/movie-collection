/*jshint esnext: true */

class MovieElement {
  constructor(title, overview, rating, publishDate, backdropPath, posterPath) {
    this.title = title;
    this.description = overview;
    this.rating = rating;
    this.year = publishDate;
    this.backdrop = backdropPath;
    this.poster = posterPath;
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
  },
  createMovieUrl: function(movieTitle) {
    var api_key = "&api_key=4a8dce0b18b88827ffbc32dee5b66838";
    var urlFirstPart = "https://api.themoviedb.org/3/search/movie?query=";
    var url = urlFirstPart + movieTitle + api_key;
    return url;
  }
};

function http(url) {
  var core = {
    ajax: function(method, url, args) {
      var promise = new Promise(function(resolve, reject) {
        var client = new XMLHttpRequest();
        var uri = url;
        if(method === "GET") {
          client.open(method, uri);
          client.send();
          client.onload = function () {
            if(this.status == 200) {
              resolve(this.response);
            } else {
              reject(this.statusText);
            }
          };
          client.onerror = function () {
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
}

var callback = {
  success: function(data) {
    var movieData;
    movieData = JSON.parse(data);
    var bestVoted = movies.getMaxVotedElement(movieData, callback.title);
    var backdropPath = movies.createImageUrl(bestVoted.backdrop_path);
    var posterPath = movies.createImageUrl(bestVoted.poster_path);
    /*var movie =  {
      title: bestVoted.title,
      description: bestVoted.overview,
      rating: bestVoted.vote_average,
      year: bestVoted.release_date,
      backdrop: backdropPath,
      poster: posterPath
    };*/
    var movie = new MovieElement(
      bestVoted.title,
      bestVoted.overview,
      bestVoted.vote_average,
      bestVoted.release_date,
      backdropPath,
      posterPath
    );
    movieListData.push(movie);
  },
  error: function(data) {
    console.log(2, "error", JSON.parse(data));
  },
  title: ""
};


function getMoviesWithPromise () {
  var movieList = [
    {title: "star wars episode iv"},
    {title: "avengers"}
  ];

  for(var key in movieList) {
    callback.title = movieList[key].title;
    http(movies.createMovieUrl(callback.title))
      .get()
      .then(callback.success)
      .catch(callback.error);
  }
}

/*(function() {
  getMoviesWithPromise();
}());*/
