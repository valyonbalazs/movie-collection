var menuItems = [
  {'item': 'LINK1'},
  {'item': 'link2'},
  {'item': 'LINK3'}
];

var MenuItem = React.createClass({displayName: "MenuItem",
  render: function () {
    return(
      React.createElement("li", null, 
        this.props.menuItem
      )
    );
  }
});

var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var uppercaseItem = itemValue.toString().toUpperCase();
      return(
          React.createElement(MenuItem, {menuItem: uppercaseItem})
      );
    });

    return(
      React.createElement("ul", {className: "nav"}, 
        menuItemArray
      )
    );
  }
});

React.render(React.createElement(Navbar, null), document.getElementById("navBar"));
