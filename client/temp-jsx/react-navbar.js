var menuItems = [
  {'item': 'fa fa-home,LINK1'},
  {'item': 'fa fa-home,LINK2'},
  {'item': 'fa fa-home,LINK3'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({displayName: "MenuItem",
  handleClick: function () {
    loginBtnClick();
  },
  render: function () {
    return(
      React.createElement("li", null, 
        React.createElement("i", {className: this.props.menuItemIcon, onClick: this.handleClick}), this.props.menuItemText
      )
    );
  }
});

var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var userProfilPic = userInstance.ProfilePicUrl;
    var userName = userInstance.UserName;
    var userEmail = userInstance.Email;
    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var splitted = [];
      splitted = itemValue.split(",");
      var icon = splitted[0];
      var text = splitted[1];
      var lowercaseItemIcon = icon.toLowerCase();
      var uppercaseItemText = text.toUpperCase();
      return(
          React.createElement(MenuItem, {menuItemIcon: lowercaseItemIcon, menuItemText: uppercaseItemText})
      );
    });

    return(
      React.createElement("div", {className: "nav col-lg-12 col-md-12"}, 
        React.createElement("ul", {className: "col-md-10"}, 
          menuItemArray
        ), 
        React.createElement("div", {id: "navbarProfile", className: "col-md-2"}, 
        userName, " ", React.createElement("img", {src: userProfilPic})
        )
      )
    );
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
var NavbarMobileOpen =  React.createClass({displayName: "NavbarMobileOpen",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    var userProfilPic = userInstance.ProfilePicUrl;
    var userName = userInstance.UserName;
    var userEmail = userInstance.Email;
    console.log(userProfilPic);

    var menuItemArray = this.state.data.map(function (item) {
      var itemValue = item.item;
      var splitted = [];
      splitted = itemValue.split(",");
      var icon = splitted[0];
      var text = splitted[1];
      var lowercaseItemIcon = icon.toLowerCase();
      var uppercaseItemText = text.toUpperCase();
      return(
          React.createElement(MenuItem, {menuItemIcon: lowercaseItemIcon, menuItemText: uppercaseItemText})
      );
    });

    return(
      React.createElement("div", {id: "navbarDivOpenedDiv", className: "navbarDivOpened col-xs-12"}, 
        React.createElement("div", {id: "navbarOpenProfileImage"}, 
          React.createElement("img", {src: userProfilPic}), 
          React.createElement("h4", null, userName), 
          React.createElement("h5", null, userEmail)
        ), 
        React.createElement("div", {id: "navbarOpenLinks"}, 
          React.createElement("ul", {className: "nav"}, 
            menuItemArray
          )
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

function renderAllNavbar() {
  renderNavbar();
  renderNavbarMobileClosed();
  renderNavbarMobileOpen();
};

function renderNavbar () {
    React.render(React.createElement(Navbar, null), document.getElementById("navBar"));
}

function renderNavbarMobileClosed () {
    React.render(React.createElement(NavbarMobileClosed, null), document.getElementById('mobileNavBar'));
}

function renderNavbarMobileOpen () {
    React.render(React.createElement(NavbarMobileOpen, null), document.getElementById('mobileNavBarLinks'));
}
