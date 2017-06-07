import React from 'react';
import { browserHistory } from 'react-router';

import { createBlocky } from '../../services/blockies';
import { nickNameByAddress } from '../../services/nicknames';

import MenuHeader from './MenuHeader';
import MenuItem from './MenuItem';

import {
 Container,
 Logo,
 LogoWrapper,
 MenuContainer,
} from './styles';

const TableMenu = (props) => {
  const {
    loggedIn, open, myPos, signerAddr, sitout, handleClickLogout,
    onLeave, onSitout, toggleMenuOpen, toggleMenuActive,
  } = props;
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
  const name = signerAddr ? nickNameByAddress(signerAddr) : null;
  const blocky = signerAddr ? createBlocky(signerAddr) : null;
  // render if guest
  if (!loggedIn) {
    return (
      <Container name="container">
        <LogoWrapper name="logo-wrapper">
          <Logo>AceBusters Logo</Logo>
        </LogoWrapper>
        <MenuContainer name="menu-container-guest">
          <MenuHeader
            handleMouseUpDown={() => toggleMenuActive()}
            handleClick={() => browserHistory.push('/register')}
            {...props}
          />
          {menuGuest.map((item, index) => <MenuItem key={index} item={item} />)}
        </MenuContainer>
      </Container>
    );
  }
  // render if user
  return (
    <Container name="container">
      <LogoWrapper name="logo-wrapper">
        <Logo>AceBusters Logo</Logo>
      </LogoWrapper>
      <MenuContainer open={open} name="menu-container-close">
        <MenuHeader
          name={name}
          blocky={blocky}
          handleMouseUpDown={() => toggleMenuActive()}
          handleClick={() => toggleMenuOpen()}
          {...props}
        />
        {open ?
          menuOpen.map((item, index) => <MenuItem key={index} item={item} />)
          :
          menuClose.map((item, index) => <MenuItem key={index} item={item} />)
        }
      </MenuContainer>
    </Container>
  );
};

TableMenu.propTypes = {
  loggedIn: React.PropTypes.bool,
  myPos: React.PropTypes.number,
  signerAddr: React.PropTypes.string,
  handleClickLogout: React.PropTypes.func,
  onLeave: React.PropTypes.func,
  sitout: React.PropTypes.any, // TODO change to only number
  onSitout: React.PropTypes.func,
  open: React.PropTypes.bool,
  toggleMenuActive: React.PropTypes.func,
  toggleMenuOpen: React.PropTypes.func,
};

export default TableMenu;
