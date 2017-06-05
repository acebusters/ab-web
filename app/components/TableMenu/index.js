import React from 'react';
import { browserHistory } from 'react-router';

import MenuHeader from './MenuHeader';
import MenuHeaderGuest from './MenuHeaderGuest';
import MenuItem from './MenuItem';

import {
 Container,
 Logo,
 LogoWrapper,
 MenuContainer,
} from './styles';

class TableMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      open: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleActiveOn = this.toggleActiveOn.bind(this);
    this.toggleActiveOff = this.toggleActiveOff.bind(this);
  }
  toggleActiveOn() {
    this.setState({ active: true });
  }
  toggleActiveOff() {
    this.setState({ active: false });
  }
  toggleMenu() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { myPos, signerAddr, sitout, handleClickLogout, onLeave, onSitout } = this.props;
    const loggedIn = this.props.account.loggedIn;
    const menuClose = [
      // Note: sitout value possibilities
      // sitout > 0, for enabled "play"
      // sitout === 0, for disabled "play"
      // sitout === undefined, for enabled "pause"
      // sitout === null, for disabled
      // myPos === -1, then not at table"pause"
      {
        name: 'sitout',
        icon: (typeof sitout === 'number') ? 'fa fa-play' : 'fa fa-pause',
        title: (typeof sitout === 'number') ? 'Sit-In' : 'Sit-Out',
        onClick: onSitout,
        disabled: myPos === undefined || sitout === 0 || sitout === null,
      },
      {
        name: 'standup',
        icon: 'fa fa-external-link',
        title: 'Stand-Up',
        onClick: onLeave,
        disabled: myPos === undefined,
        /* TODO add seatStatus to UI redux state and
          mapStateToProps in TableMenu container to be used here */
        // disabled: myPos === undefined ||
        //   seatStatus === STATUS_MSG.sittingIn ||
        //   seatStatus === STATUS_MSG.standingUp,
      },
    ];
    const menuOpen = [
      {
        name: 'lobby',
        icon: 'fa fa-search',
        title: 'Lobby',
        onClick: () => browserHistory.push('/lobby'),
        disabled: false,
      },
      {
        name: 'dashboard',
        icon: 'fa fa-tachometer',
        title: 'Dashboard',
        onClick: () => browserHistory.push('/dashboard'),
        disabled: false,
      },
      {
        name: 'preferences',
        icon: 'fa fa-cog',
        title: 'Preferences',
        onClick: () => {},
        disabled: true,
      },
      {
        name: 'logout',
        icon: 'fa fa-sign-out',
        title: 'Log-Out',
        onClick: () => handleClickLogout(),
        disabled: false,
      },
    ];
    const menuGuest = [
      {
        name: 'lobby',
        icon: 'fa fa-search',
        title: 'Lobby',
        onClick: () => browserHistory.push('/lobby'),
        disabled: false,
      },
      {
        name: 'signin',
        icon: 'fa fa-sign-in',
        title: 'Log-In',
        onClick: () => browserHistory.push('/login'),
        disabled: false,
      },
    ];

    const { open } = this.state;
    return (
      <Container name="container">
        <LogoWrapper name="logo-wrapper">
          <Logo>AceBusters Logo</Logo>
        </LogoWrapper>
        {/* render Guest Menu */}
        {!loggedIn &&
          <MenuContainer name="menu-container-guest">
            <MenuHeaderGuest
              btnActive={this.state.active}
              onMouseDown={() => this.toggleActiveOn()}
              onMouseUp={() => this.toggleActiveOff()}
              handleClick={() => browserHistory.push('/register')}
            />
            {menuGuest.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </MenuContainer>
        }

        {/* render LoggedIn user menus */}
        {loggedIn && !open &&
          <MenuContainer open={open} name="menu-container-close">
            <MenuHeader
              name="toggle-menu-button"
              open={open}
              btnActive={this.state.active}
              signerAddr={signerAddr}
              onMouseDown={() => this.toggleActiveOn()}
              onMouseUp={() => this.toggleActiveOff()}
              onToggleMenu={() => this.toggleMenu()}
            />
            {menuClose.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </MenuContainer>
        }
        {loggedIn && open &&
          <MenuContainer open={open} name="menu-container-open">
            <MenuHeader
              open={open}
              btnActive={this.state.active}
              signerAddr={signerAddr}
              onMouseDown={() => this.toggleActiveOn()}
              onMouseUp={() => this.toggleActiveOff()}
              onToggleMenu={() => this.toggleMenu()}
            />
            {menuOpen.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </MenuContainer>
        }
      </Container>
    );
  }
}
TableMenu.propTypes = {
  account: React.PropTypes.object,
  myPos: React.PropTypes.number,
  signerAddr: React.PropTypes.string,
  handleClickLogout: React.PropTypes.func,
  onLeave: React.PropTypes.func,
  sitout: React.PropTypes.any, // TODO change to only number
  onSitout: React.PropTypes.func,
};

export default TableMenu;
