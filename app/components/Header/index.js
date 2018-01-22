import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import Navbar from './Navbar';
import NavItem from './NavItem';

import {
  StyledHeader,
  NavToggle,
  StyledUserName,
  StyledUserImage,
  LogoWrapper,
} from './styles';

import { Logo } from '../Logo';
import Link from '../Link';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside() {
    if (!this.props.collapsed) {
      this.props.setCollapsed(true);
    }
  }

  get navButtons() {
    const {
      accountIsGenerated, loggedIn, blocky, nickName,
      setCollapsed, collapsed, onClickLogout,
    } = this.props;

    if (loggedIn) {
      const buttons = [
        <NavToggle
          onClick={() => setCollapsed(!collapsed)}
          key="nav-toggle"
        >
          <i className="fa fa-bars fa-2"></i>
        </NavToggle>,
        <NavItem
          to="/lobby"
          collapsed={collapsed}
          key="2"
          title="Lobby"
          location={location}
        />,
        <NavItem
          to="/dashboard"
          key="3"
          collapsed={collapsed}
          title={<span>
            <StyledUserImage src={blocky} />
            <StyledUserName>{nickName}</StyledUserName>
          </span>}
          location={location}
        />,
      ];

      if (!accountIsGenerated) {
        buttons.push(
          <NavItem
            onClick={onClickLogout}
            key="4"
            collapsed={collapsed}
            title="Sign Out"
          />
        );
      }

      return buttons;
    }

    return [
      <NavItem
        collapseOnMobile={false}
        to="/register"
        key="1"
        title="Register"
        location={this.props.location}
      />,
      <NavItem
        collapseOnMobile={false}
        to="/login"
        key="2"
        title="Login"
        location={this.props.location}
      />,
    ];
  }

  render() {
    return (
      <StyledHeader
        onMouseLeave={this.handleClickOutside}
        fixed={this.props.fixed}
        id="header"
      >
        <Navbar loggedIn={this.props.loggedIn}>
          <Link to="/">
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </Link>
          {this.navButtons}
        </Navbar>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  location: PropTypes.object,
  loggedIn: PropTypes.bool,
  accountIsGenerated: PropTypes.bool,
  onClickLogout: PropTypes.func,
  setCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  nickName: PropTypes.string,
  blocky: PropTypes.string,
};

Header.defaultProps = {
  fixed: false,
  sidebarMini: false,
  logoLg: <span><b>Ace</b>Busters</span>,
  logoSm: <span><b>A</b>B</span>,
};

export default onClickOutside(Header);
