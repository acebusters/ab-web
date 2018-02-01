import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import NavItem from './NavItem';

import {
  StyledHeader,
  StyledUserName,
  StyledUserImage,
  LogoWrapper,
} from './styles';

import { Logo } from '../Logo';
import Link from '../Link';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(menuIndex) {
    const { onImport, onExport, onLogout } = this.props;
    const handler = [onImport, onExport, onLogout][menuIndex];
    if (typeof handler === 'function') {
      handler();
    }
  }

  render() {
    const { blocky, nickName, location } = this.props;

    return (
      <StyledHeader
        onMouseLeave={this.handleClickOutside}
        fixed={this.props.fixed}
        id="header"
      >
        <Navbar loggedIn={this.props.loggedIn} transparent={this.props.transparent}>
          <Link to="/">
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </Link>

          <NavItem
            to="/lobby"
            title="Lobby"
            location={location}
          />

          <NavItem
            to="/dashboard"
            title={
              <span>
                <StyledUserImage src={blocky} />
                <StyledUserName>{nickName}</StyledUserName>
              </span>
            }
            location={location}
            menu={['Import account', 'Export account', 'Logout']}
            onMenuClick={this.handleMenuClick}
          />
        </Navbar>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  transparent: PropTypes.bool,
  loggedIn: PropTypes.bool,
  location: PropTypes.object,
  nickName: PropTypes.string,
  blocky: PropTypes.string,
  onLogout: PropTypes.func,
  onImport: PropTypes.func,
  onExport: PropTypes.func,
};

Header.defaultProps = {
  transparent: false,
  fixed: false,
  sidebarMini: false,
  logoLg: <span><b>Ace</b>Busters</span>,
  logoSm: <span><b>A</b>B</span>,
};

export default Header;
