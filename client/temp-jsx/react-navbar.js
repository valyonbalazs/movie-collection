var menuItems = [
  {'item': 'fa fa-home'},
  {'item': 'fa fa-home'},
  {'item': 'fa fa-home'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({displayName: "MenuItem",
  handleClick: function () {
    loginBtnClick();
  },
  render: function () {
    return(
      React.createElement("li", null, 
        React.createElement("button", {onClick: this.handleClick}, React.createElement("i", {className: this.props.menuItem}))
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
      var uppercaseItem = itemValue.toString().toLowerCase();
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

//SMALL OR MOBILE RESOLUTION NAVBAR
var NavbarMobileOpen =  React.createClass({displayName: "NavbarMobileOpen",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var uppercaseItem = itemValue.toString().toLowerCase();
      return(
          React.createElement(MenuItem, {menuItem: uppercaseItem})
      );
    });

    return(
      React.createElement("div", {id: "navbarDivOpenedDiv", className: "navbarDivOpened col-xs-12"}, 
        React.createElement("ul", {className: "nav"}, 
          menuItemArray
        )
    )
    );
  }
});

var opened = false;
var NavbarMobileClosed = React.createClass({displayName: "NavbarMobileClosed",
  handleClick: function (event) {
    if(opened == false) {
      opened = true;
      document.getElementById('mobileNavBarLinks').style.width = '85%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'visible';
    } else {
      opened = false;
      document.getElementById('mobileNavBarLinks').style.width = '0%';
      document.getElementById('navbarDivOpenedDiv').style.visibility = 'hidden';
    }
  },
  render: function () {
    return(
      React.createElement("div", {className: "navbarMobileClosed col-xs-12"}, 
        React.createElement("i", {className: "fa fa-bars", onClick: this.handleClick})
      )
    );
  }
});

React.render(React.createElement(NavbarMobileClosed, null), document.getElementById('mobileNavBar'));

React.render(React.createElement(NavbarMobileOpen, null), document.getElementById('mobileNavBarLinks'));
