var menuItems = [
  {'item': 'link1'},
  {'item': 'link2'},
  {'item': 'link3'}
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
      return(
          React.createElement(MenuItem, {menuItem: item})
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
