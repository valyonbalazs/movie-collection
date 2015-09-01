/* jshint esnext: true */

let AddMovie = React.createClass({displayName: "AddMovie",
  render: function () {
    return (
      React.createElement("div", {id: "addMovieContainer", className: "col-lg-4 col-md-4 col-xs-12"}, 
        React.createElement("input", {type: "text", className: "form-control", placeholder: "Title"}), 
        React.createElement("button", {className: "btn btn-warning"}, React.createElement("i", {className: "fa fa-plus-square"}), " Add")
      )
    );
  }
});

let ListMoviesFromDb = React.createClass({displayName: "ListMoviesFromDb",
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadMovieTitles();
  },
  loadMovieTitles: function () {
    let promise = function () {
      return new Promise(function (resolve, reject) {
        let uid = localStorage.getItem('uid');
        ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
          for (let i of snapshot.val()) {
            ownMovieTitleList.push(i);
          }
          resolve(function () { });
        });
      });
    };

    let context = this;
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

let MovieElementFromDb = React.createClass({displayName: "MovieElementFromDb",
  render: function () {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.title), 
        React.createElement("td", null, React.createElement("button", {className: "btn btn-danger"}, React.createElement("i", {className: "fa fa-trash-o"}), " Remove"))
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
