/* jshint esnext: true */

let AddMovie = React.createClass({
  render: function () {
    return (
      <div id="addMovieContainer" className="col-lg-4 col-md-4 col-xs-12" >
        <input type="text" className="form-control" placeholder="Title" />
        <button className="btn btn-warning">Add</button>
      </div>
    );
  }
});

let ListMoviesFromDb = React.createClass({
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
        <MovieElementFromDb title={title} />
      );
    });
    return (
      <div id="listMoviesFromDbContainer" className="col-lg-4 col-md-4 col-xs-12" >
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Action</td>
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

let MovieElementFromDb = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>REMOVE</td>
      </tr>
    );
  }
});

let ManagePage = React.createClass({
  render: function () {
    return (
      <div>
        <AddMovie />
        <ListMoviesFromDb />
      </div>
    );
  }
});
