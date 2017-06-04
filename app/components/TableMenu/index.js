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

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      open: false,
      myPos: 1, // myPos === -1, then not at table
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
    const { signerAddr, sitout, onLeave, onSitout } = this.props;
    const menuClose = [
      // Note: sitout value possibilities
      // sitout > 0, for enabled "play"
      // sitout === 0, for disabled "play"
      // sitout === undefined, for enabled "pause"
      // sitout === null, for disabled "pause"
      {
        icon: (typeof sitout === 'number') ? 'fa fa-play' : 'fa fa-pause',
        title: (typeof sitout === 'number') ? 'Sit-In' : 'Sit-Out',
        onClick: onSitout,
        disabled: sitout === 0 || sitout === null,
      },
      {
        icon: 'fa fa-sign-out',
        title: 'Stand-Up',
        onClick: onLeave,
      },
    ];
    const menuOpen = [
      {
        icon: 'fa fa-search',
        title: 'Lobby',
        onClick: () => browserHistory.push('/lobby'),
      },
      {
        icon: 'fa fa-tachometer',
        title: 'Dashboard',
        onClick: () => browserHistory.push('/dashboard'),
      },
      {
        icon: 'fa fa-cog',
        title: 'Preferences',
        onClick: () => {},
      },
    ];

    const { myPos, open } = this.state;
    if (myPos > -1) {
      return (
        <Container>
          <LogoWrapper>
            <Logo>AceBusters Logo</Logo>
          </LogoWrapper>
          {!open ?
            <MenuContainer open={open} className="menu-container">
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
            <MenuContainer open={open} className="menu-container">
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
    return null;
  }
}
Temp.propTypes = {
  signerAddr: React.PropTypes.string,
  onLeave: React.PropTypes.func,
  sitout: React.PropTypes.number,
  onSitout: React.PropTypes.func,
};

export default Temp;
