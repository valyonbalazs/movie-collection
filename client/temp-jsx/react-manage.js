/* jshint esnext: true */

let AddMovie = React.createClass({displayName: "AddMovie",
  handleClick: () => {
    MyMoviesActions.addMovieToDb();
  },
  render: function () {
    return (
      React.createElement("div", {id: "addMovieContainer", className: "col-lg-11 col-md-11 col-xs-12"}, 
        React.createElement("input", {id: "addMovieTitleInputField", type: "text", className: "form-control col-lg-2 col-md-4 col-lg-offset-1 col-md-offset-1 col-xs-8", placeholder: "Title"}), 
        React.createElement("button", {id: "addMovieTitleButton", className: "btn btn-warning col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-xs-4", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-plus-square"}), " Add")
      )
    );
  }
});

let indexTitleMap = new Map();
let ListMoviesFromDb = React.createClass({displayName: "ListMoviesFromDb",
  getInitialState: () => {
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
      React.createElement("div", {id: "listMoviesFromDbContainer", className: "col-lg-10 col-md-10 col-md-offset-1 col-xs-12"}, 
        React.createElement("table", {className: "table table-striped"}, 
          React.createElement("thead", null, 
            React.createElement("tr", null, 
              React.createElement("th", null, "My movies")
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
let idCounter = 1;
let MovieElementFromDb = React.createClass({displayName: "MovieElementFromDb",
  handleClick: function () {
    let context = this;
    MyMoviesActions.removeMovieFromDb(context);
  },
  render: function () {
    let btnId = 'removeBtn' + idCounter;
    idCounter++;
    return (
      React.createElement("tr", null, 
        React.createElement("td", {className: "col-xs-9"}, this.props.title), 
        React.createElement("td", {className: "col-xs-3"}, React.createElement("button", {id: btnId, className: "btn btn-danger", onClick: this.handleClick}, React.createElement("i", {className: "fa fa-trash-o"}), " Remove"))
      )
    );
  }
});

let ManagePage = React.createClass({displayName: "ManagePage",
  render: () => {
    return (
      React.createElement("div", null, 
        React.createElement(AddMovie, null), 
        React.createElement(ListMoviesFromDb, null)
      )
    );
  }
});
