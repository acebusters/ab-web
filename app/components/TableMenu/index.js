import React from 'react';
import { browserHistory } from 'react-router';

import MenuHeader from './MenuHeader';
import MenuItems from './MenuItems';

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
    const { myPos, signerAddr, sitout, onLeave, onSitout } = this.props;
    const menuClose = [
      // Note: sitout value possibilities
      // sitout > 0, for enabled "play"
      // sitout === 0, for disabled "play"
      // sitout === undefined, for enabled "pause"
      // sitout === null, for disabled
      // myPos === -1, then not at table"pause"
      {
        icon: (typeof sitout === 'number') ? 'fa fa-play' : 'fa fa-pause',
        title: (typeof sitout === 'number') ? 'Sit-In' : 'Sit-Out',
        onClick: onSitout,
        disabled: myPos === undefined || sitout === 0 || sitout === null,
      },
      {
        icon: 'fa fa-sign-out',
        title: 'Stand-Up',
        onClick: onLeave,
        disabled: myPos === undefined,
        /* TODO add seatStatus to UI redux state and
          mapStateToProps in Table container to be used here */
        // disabled: myPos === undefined ||
        //   seatStatus === STATUS_MSG.sittingIn ||
        //   seatStatus === STATUS_MSG.standingUp,
      },
    ];
    const menuOpen = [
      {
        icon: 'fa fa-search',
        title: 'Lobby',
        onClick: () => browserHistory.push('/lobby'),
        disabled: false,
      },
      {
        icon: 'fa fa-tachometer',
        title: 'Dashboard',
        onClick: () => browserHistory.push('/dashboard'),
        disabled: false,
      },
      {
        icon: 'fa fa-cog',
        title: 'Preferences',
        onClick: () => {},
        disabled: true,
      },
    ];

    const { open } = this.state;
    return (
      <Container name="container">
        <LogoWrapper>
          <Logo>AceBusters Logo</Logo>
        </LogoWrapper>
        {!open ?
          <MenuContainer open={open} name="menu-container-open">
            <MenuHeader
              open={open}
              btnActive={this.state.active}
              signerAddr={signerAddr}
              onMouseDown={() => this.toggleActiveOn()}
              onMouseUp={() => this.toggleActiveOff()}
              onToggleMenu={() => this.toggleMenu()}
            />
            <MenuItems items={menuClose} />
          </MenuContainer>
          :
          <MenuContainer open={open} name="menu-container-closed">
            <MenuHeader
              open={open}
              btnActive={this.state.active}
              signerAddr={signerAddr}
              onMouseDown={() => this.toggleActiveOn()}
              onMouseUp={() => this.toggleActiveOff()}
              onToggleMenu={() => this.toggleMenu()}
            />
            <MenuItems items={menuOpen} />
          </MenuContainer>
        }
      </Container>
    );
  }
}
TableMenu.propTypes = {
  myPos: React.PropTypes.number,
  signerAddr: React.PropTypes.string,
  onLeave: React.PropTypes.func,
  sitout: React.PropTypes.number,
  onSitout: React.PropTypes.func,
};

export default TableMenu;
