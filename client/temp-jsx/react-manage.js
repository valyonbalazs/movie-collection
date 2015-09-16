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

let ListMoviesFromDb = React.createClass({displayName: "ListMoviesFromDb",
  getInitialState: () => {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadMovieTitles();
  },
  loadMovieTitles: function () {
    let context = this;
    MyMoviesActions.loadMovieTitles(context);
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
