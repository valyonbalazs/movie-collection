/* jshint esnext: true */

let AddMovie = React.createClass({displayName: "AddMovie",
  handleClick: function () {
    let movieTitle = document.getElementById('addMovieTitleInputField').value;
    let uid = localStorage.getItem('uid');
    let biggestKey = 1;
    for(let i of indexTitleMap) {
      if(parseInt(i[0]) > biggestKey) {
        biggestKey = i[0];
      }
    }
    let convertToNumber = parseInt(biggestKey);
    let newBiggestKey = convertToNumber + 1;

    console.log("adding movie");
    ref.child('movielist').child(uid).child('movies').child(newBiggestKey).set({
      title: movieTitle
    });
  },
  render: function () {
    return (
      React.createElement("div", {id: "addMovieContainer", className: "col-lg-4 col-md-4 col-xs-12"}, 
        React.createElement("input", {id: "addMovieTitleInputField", type: "text", className: "form-control", placeholder: "Title"}), 
        React.createElement("button", {className: "btn btn-warning", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-plus-square"}), " Add")
      )
    );
  }
});

let indexTitleMap = new Map();
let ListMoviesFromDb = React.createClass({displayName: "ListMoviesFromDb",
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadMovieTitles();
  },
  loadMovieTitles: function () {
    let context = this;
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          console.log("loading list");
          ownMovieTitleList = [];
          let data = snapshot.val();
          if(data === null) {

          } else {

            //Has to get the keys from the database for the adding-function
            //to create a non-existing key for the new element
            for (let i in data) {
              let values = data;
              indexTitleMap.set(i, values[i].title);
            }

            for(let j in data) {
              ownMovieTitleList.push(data[j].title);
            }
            this.setState({data: ownMovieTitleList});

            resolve(function () { });
          }
        }.bind(context));
      });
    };

    promise().then(function () {
      this.setState({data: ownMovieTitleList});
    }.bind(context));
  },
  render: function () {
    let movieTitleArray = this.state.data.map(function (title) {
      return (
        React.createElement(MovieElementFromDb, {title: title})
      );
    });
    return (
      React.createElement("div", {id: "listMoviesFromDbContainer", className: "col-lg-4 col-md-4 col-xs-12"}, 
        React.createElement("table", {className: "table table-striped"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", {colSpan: "2"}, "My movies")
            )
          ), 
          React.createElement("tbody", null, 
            movieTitleArray
          )
        )
      )
    );
  }
});

let keyTitleMap = new Map();
let MovieElementFromDb = React.createClass({displayName: "MovieElementFromDb",
  handleClick: function () {
    let uid = localStorage.getItem('uid');
    let title = this.props.title;
    ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
      let data = snapshot.val();
      for (let i in data) {
        let values = data;
        keyTitleMap.set(i, values[i].title);
      }

      for(let j of keyTitleMap) {
        if(title === j[1]) {
          console.log("title: " + title + " j: " + j[1]);
          ref.child('movielist').child(uid).child('movies').child(j[0]).remove();
          let indexOfElement = ownMovieTitleList.indexOf(j[1]);
          if(indexOfElement > -1) {
            ownMovieTitleList.splice(indexOfElement, 1);
          }
        }
      }
    });
  },
  render: function () {
    return (
      React.createElement("tr", null, 
        React.createElement("td", {className: "col-xs-6"}, this.props.title), 
        React.createElement("td", {className: "col-xs-6"}, React.createElement("button", {className: "btn btn-danger", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-trash-o"}), " Remove"))
      )
    );
  }
});

let ManagePage = React.createClass({displayName: "ManagePage",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(AddMovie, null), 
        React.createElement(ListMoviesFromDb, null)
      )
    );
  }
});
