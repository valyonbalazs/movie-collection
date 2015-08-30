/*jshint esnext: true */

let menuItems = [
  {'item': 'fa fa-home,Home'},
  {'item': 'fa fa-film,Movies'},
  {'item': 'fa fa-wrench,Manage'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
let MenuItem = React.createClass({displayName: "MenuItem",
  render: function () {
    let path = '#/' + this.props.link;
    return(
      React.createElement("li", null, 
        React.createElement("a", {href: path}, React.createElement("i", {className: this.props.menuItemIcon}), this.props.menuItemText)
      )
    );
  }
});

let Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    let userProfilPic = userInstance.ProfilePicUrl;
    let userName = userInstance.UserName;
    let userEmail = userInstance.Email;
    let menuItemArray = this.state.data.map(function (item) {
      let itemValue = item.item;
      let splitted = [];
      splitted = itemValue.split(",");
      let icon = splitted[0];
      let text = splitted[1];
      let lowercaseItemIcon = icon.toLowerCase();
      let uppercaseItemText = text.toUpperCase();
      let linkPath = text;
      return(
          React.createElement(MenuItem, {menuItemIcon: lowercaseItemIcon, menuItemText: uppercaseItemText, link: linkPath})
      );
    });

    return(
      React.createElement("div", {className: "nav col-lg-12 col-md-12"}, 
          React.createElement("h3", null, "Movie-Collection"), 
        React.createElement("ul", null, 
          menuItemArray
        ), 
        React.createElement("div", null, 
          userName, " ", React.createElement("img", {src: userProfilPic})
        )
      )
    );
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
let NavbarMobileOpen =  React.createClass({displayName: "NavbarMobileOpen",
  getInitialState: function () {
    return {data: menuItems};
  },
  render: function () {
    let userProfilPic = userInstance.ProfilePicUrl;
    let userName = userInstance.UserName;
    let userEmail = userInstance.Email;
    console.log(userProfilPic);

    let menuItemArray = this.state.data.map(function (item) {
      let itemValue = item.item;
      let splitted = [];
      splitted = itemValue.split(",");
      let icon = splitted[0];
      let text = splitted[1];
      let lowercaseItemIcon = icon.toLowerCase();
      let uppercaseItemText = text.toUpperCase();
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

let opened = false;
let NavbarMobileClosed = React.createClass({displayName: "NavbarMobileClosed",
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
        React.createElement("i", {className: "fa fa-bars", onClick: this.handleClick}), 
        React.createElement("p", null, "Movie-Collection")
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
