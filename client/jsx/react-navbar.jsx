var menuItems = [
  {'item': 'link1'},
  {'item': 'link2'},
  {'item': 'link3'}
];

var MenuItem = React.createClass({
  render: function () {
    return(
      <li>
        {this.props.menuItem}
      </li>
    );
  }
});

var Navbar = React.createClass({
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var menuItemArray = this.state.data.map(function (item) {
      return(
          <MenuItem menuItem={item} />
      );
    });

    return(
      <ul className="nav"> 
        {menuItemArray}
      </ul>
    );
  }
});

React.render(<Navbar />, document.getElementById("navBar"));
