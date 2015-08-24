var menuItems = [
  {'item': 'fa fa-home,LINK1'},
  {'item': 'fa fa-home,LINK2'},
  {'item': 'fa fa-home,LINK3'}
];

//MEDIUM AND HIGH RESOLUTION NAVBAR
var MenuItem = React.createClass({
  handleClick: function () {
    loginBtnClick();
  },
  render: function () {
    return(
      <li>
        <i className={this.props.menuItemIcon} onClick={this.handleClick}></i>{this.props.menuItemText}
      </li>
    );
  }
});

var Navbar = React.createClass({
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
          <MenuItem menuItemIcon={lowercaseItemIcon} menuItemText={uppercaseItemText}/>
      );
    });

    return(
      <div className="nav col-lg-12 col-md-12">
        <ul className="col-md-10">
          {menuItemArray}
        </ul>
        <div id="navbarProfile" className="col-md-2">
        {userName} <img src={userProfilPic} />
        </div>
      </div>
    );
  }
});

//SMALL OR MOBILE RESOLUTION NAVBAR
var NavbarMobileOpen =  React.createClass({
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

var opened = false;
var NavbarMobileClosed = React.createClass({
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
      </div>
    );
  }
});

function renderNavbar() {
  React.render(<Navbar />, document.getElementById("navBar"));
  React.render(<NavbarMobileClosed />, document.getElementById('mobileNavBar'));
  React.render(<NavbarMobileOpen />, document.getElementById('mobileNavBarLinks'));
};
