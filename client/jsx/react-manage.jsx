/* jshint esnext: true */

let AddMovie = React.createClass({
  handleClick: function () {

  },
  render: function () {
    return (
      <div id="addMovieContainer" className="col-lg-4 col-md-4 col-xs-12" >
        <input type="text" className="form-control" placeholder="Title" />
        <button className="btn btn-warning"><i className="fa fa-plus-square"></i> Add</button>
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan ="2">My movies</th>
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
  handleClick: function () {
    let uid = localStorage.getItem('uid');
    let title = this.props.title.title;
    let counter = 0;
    let elementNumber = 0;
    console.log(title);
    ref.child('movielist').child(uid).child('movies').on('value', function (snapshot) {
      for (let i of snapshot.val()) {
        if(counter > 0) {
            if(i.title == title) {
              elementNumber = counter;
            }
        }
        counter++;
      }
    });

    ref.child('movielist').child(uid).child('movies').child(elementNumber).remove();

  },
  render: function () {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td><button className="btn btn-danger" onClick={this.handleClick} ><i className="fa fa-trash-o"></i> Remove</button></td>
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
