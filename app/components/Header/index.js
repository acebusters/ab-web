import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import UserMenu from './UserMenu';
import NavItem from './NavItem';

import {
  StyledHeader,
  NavToggle,
} from './styles';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCollapsedMenu = this.toggleCollapsedMenu.bind(this);
  }

  toggleCollapsedMenu() {
    const collapsed = (this.state) ? !this.state.toggleCollapsed : false;
    this.setState({ toggleCollapsed: collapsed });
  }

  render() {
    const collapsed = (this.state) ? this.state.toggleCollapsed : true;
    const navButtons = this.props.loggedIn ? ([
      <NavToggle
        onClick={this.toggleCollapsedMenu}
        key="nav-toggle"
      >
        <i className="fa fa-bars fa-2"></i>
      </NavToggle>,
      <NavItem
        to="dashboard"
        collapsed={collapsed}
        key="2"
        title="Dashboard"
        location={this.props.location}
      />,
      <NavItem
        to="lobby"
        key="3"
        collapsed={collapsed}
        title="Lobby"
        location={this.props.location}
      />,
      <UserMenu
        onLogout={this.props.onClickLogout}
        collapsed={collapsed}
        key="4"
        {...this.props}
      />,
    ]) : ([
      <NavItem
        to="/register"
        key="1"
        title="Register"
        location={this.props.location}
      />,
      <NavItem
        to="/login"
        key="2"
        title="Login"
        location={this.props.location}
      />,
    ]);
    return (
      <StyledHeader fixed={this.props.fixed} id="header">
        <Navbar
          loggedIn={this.props.loggedIn}
        >
          {navButtons}
        </Navbar>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  location: PropTypes.object,
  loggedIn: PropTypes.bool,
  onClickLogout: PropTypes.func,
};

Header.defaultProps = {
  fixed: false,
  sidebarMini: false,
  logoLg: <span><b>Ace</b>Busters</span>,
  logoSm: <span><b>A</b>B</span>,
};

export default Header;
