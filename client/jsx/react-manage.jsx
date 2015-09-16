/* jshint esnext: true */

let AddMovie = React.createClass({
  handleClick: () => {
    MyMoviesActions.addMovieToDb();
  },
  render: function () {
    return (
      <div id="addMovieContainer" className="col-lg-11 col-md-11 col-xs-12" >
        <input id="addMovieTitleInputField" type="text" className="form-control col-lg-2 col-md-4 col-lg-offset-1 col-md-offset-1 col-xs-8" placeholder="Title" />
        <button id="addMovieTitleButton" className="btn btn-warning col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-xs-4" onClick={this.handleClick}><i className="fa fa-plus-square"></i> Add</button>
      </div>
    );
  }
});

let ListMoviesFromDb = React.createClass({
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
        <MovieElementFromDb title={title} />
      );
    });
    return (
      <div id="listMoviesFromDbContainer" className="col-lg-10 col-md-10 col-md-offset-1 col-xs-12" >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>My movies</th>
            </tr>
          </thead>
          <tbody>
            {movieTitleArray}
          </tbody>
        </table>
      </div>
    );
  }
});

let idCounter = 1;
let MovieElementFromDb = React.createClass({
  handleClick: function () {
    let context = this;
    MyMoviesActions.removeMovieFromDb(context);
  },
  render: function () {
    let btnId = 'removeBtn' + idCounter;
    idCounter++;
    return (
      <tr>
        <td className="col-xs-9">{this.props.title}</td>
        <td className="col-xs-3"><button id={btnId} className="btn btn-danger" onClick={this.handleClick} ><i className="fa fa-trash-o"></i> Remove</button></td>
      </tr>
    );
  }
});

let ManagePage = React.createClass({
  render: () => {
    return (
      <div>
        <AddMovie />
        <ListMoviesFromDb />
      </div>
    );
  }
});
