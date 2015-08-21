var menuItems = [
  {'item': 'LINK1'},
  {'item': 'link2'},
  {'item': 'LINK3'}
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
      var itemValue = item.item;
      var uppercaseItem = itemValue.toString().toUpperCase();
      return(
          <MenuItem menuItem={uppercaseItem} />
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
