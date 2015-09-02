/* jshint esnext: true */

let AddMovie = React.createClass({
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
      <div id="addMovieContainer" className="col-lg-4 col-md-4 col-xs-12" >
        <input id="addMovieTitleInputField" type="text" className="form-control" placeholder="Title" />
        <button className="btn btn-warning" onClick={this.handleClick}><i className="fa fa-plus-square"></i> Add</button>
      </div>
    );
  }
});

let indexTitleMap = new Map();
let ListMoviesFromDb = React.createClass({
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

let keyTitleMap = new Map();
let MovieElementFromDb = React.createClass({
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
      <tr>
        <td className="col-xs-6">{this.props.title}</td>
        <td className="col-xs-6"><button className="btn btn-danger" onClick={this.handleClick} ><i className="fa fa-trash-o"></i> Remove</button></td>
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
