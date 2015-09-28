/* jshint esnext: true */

let tvshows = {
  createTvTopRatedUrl: function () {
    let urlFirstPart = 'http://api.themoviedb.org/3/tv/top_rated?';
    let resultUrl = urlFirstPart + tmdbApiKey;
    return resultUrl;
  },
  createTvAiringUrl: function () {
    let urlFirstPart = 'http://api.themoviedb.org/3/tv/airing_today?';
    let resultUrl = urlFirstPart + tmdbApiKey;
    return resultUrl;
  },
  createTvShowUrl: function (id) {
    let urlFirstPart = 'http://api.themoviedb.org/3/tv/';
    let api_key = '?' + tmdbApiKey;
    let resultUrl = urlFirstPart + id + api_key;
    return resultUrl;
  },
  createCreditsUrl: function (id) {
    let api_key = '?' + tmdbApiKey;
    let urlSecondPart = '/credits';
    let urlFirstPart = 'https://api.themoviedb.org/3/tv/';
    let url = urlFirstPart + id + urlSecondPart + api_key;
    return url;
  }
};
