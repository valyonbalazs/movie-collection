/*jshint esnext: true */

let menuItems = [
  {'item': 'fa fa-home,LINK1'},
  {'item': 'fa fa-home,link2'},
  {'item': 'fa fa-home,LINK3'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
let MenuItem = React.createClass({
  handleClick: function () {
    loginBtnClick();
  },
  render: function () {
    return(
      <li>
        <i className={this.props.menuItemIcon} onClick={this.handleClick}></i> {this.props.menuItemText}
      </li>
    );
  }
});

let Navbar = React.createClass({
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
      return(
          <MenuItem menuItemIcon={lowercaseItemIcon} menuItemText={uppercaseItemText}/>
      );
    });

    return(
      <div className="nav col-lg-12 col-md-12">
          <h3>Movie-Collection</h3>
        <ul>
          {menuItemArray}
        </ul>
        <div>
          {userName} <img src={userProfilPic} />
        </div>
      </div>
    );
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
let NavbarMobileOpen =  React.createClass({
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
          <MenuItem menuItemIcon={lowercaseItemIcon} menuItemText={uppercaseItemText}/>
      );
    });

    return(
      <div id="navbarDivOpenedDiv" className="navbarDivOpened col-xs-12">
        <div id="navbarOpenProfileImage" >
          <img src={userProfilPic} />
          <h4>{userName}</h4>
          <h5>{userEmail}</h5>
        </div>
        <div id="navbarOpenLinks">
          <ul className="nav">
            {menuItemArray}
          </ul>
        </div>
    </div>
    );
  }
});

let opened = false;
let NavbarMobileClosed = React.createClass({
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
      <div className="navbarMobileClosed col-xs-12">
        <i className="fa fa-bars" onClick={this.handleClick} ></i>
        <p>Movie-Collection</p>
      </div>
    );
  }
});

function renderAllNavbar() {
  renderNavbar();
  renderNavbarMobileClosed();
  renderNavbarMobileOpen();
};

function renderNavbar () {
    React.render(<Navbar />, document.getElementById("navBar"));
}

function renderNavbarMobileClosed () {
    React.render(<NavbarMobileClosed />, document.getElementById('mobileNavBar'));
}

function renderNavbarMobileOpen () {
    React.render(<NavbarMobileOpen />, document.getElementById('mobileNavBarLinks'));
}
