/* jshint esnext: true */

/*let starterMovieTitles = [
  {title: 'blade runner'},
  {title: 'avengers'},
  {title: 'batman'},
  {title: 'star wars episode iv'},
  {title: 'star wars episode iii'},
  {title: 'schindler\'s list'},
  {title: 'gladiator'},
  {title: 'men in black'},
  {title: 'djangov'},
  {title: 'alien'},
  {title: 'predator'},
  {title: 'jurassic park'}
];*/

let starterMovieTitles = [];

let movieListData = [];

function addUserMovies () {
  let uid = localStorage.getItem('uid');
  ref.child('movielist').child(uid).set({
    movies: starterMovieTitles
  });
}

let discoverMovies = [];
