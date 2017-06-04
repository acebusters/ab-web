import React from 'react';
import MenuHeader from './MenuHeader';

import {
 Container,
 ItemWrapper,
 ItemIcon,
 ItemTitle,
 Logo,
 LogoWrapper,
 MenuContainer,
} from './styles';

const menuItems = [
  {
    icon: 'fa fa-search',
    title: 'Lobby',
    onClick: () => {},
  },
  {
    icon: 'fa fa-pause', // fa-play
    title: 'Sit-out', // 'Sit-in'
    onClick: () => {},
  },
  {
    icon: 'fa fa-sign-out',
    title: 'Stand-up',
    onClick: () => {},
  },
  {
    icon: 'fa fa-tachometer',
    title: 'Dashboard',
    onClick: () => {},
  },
  {
    icon: 'fa fa-cog',
    title: 'Preferences',
    onClick: () => {},
  },
];

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      open: true,
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
    const { myPos, open } = this.state;
    const { signerAddr } = this.props;
    if (myPos > -1) {
      return (
        <Container>
          <LogoWrapper>
            <Logo>AceBusters Logo</Logo>
          </LogoWrapper>
          {!open ?
            <MenuContainer open={open} className="menu-container">
              <MenuHeader
                btnActive={this.state.active}
                signerAddr={signerAddr}
                onMouseDown={() => this.toggleActiveOn()}
                onMouseUp={() => this.toggleActiveOff()}
                onToggleMenu={() => this.toggleMenu()}
              />
            </MenuContainer>
            :
            <MenuContainer open={open} className="menu-container">
              <MenuHeader
                btnActive={this.state.active}
                signerAddr={signerAddr}
                onMouseDown={() => this.toggleActiveOn()}
                onMouseUp={() => this.toggleActiveOff()}
                onToggleMenu={() => this.toggleMenu()}
              />
              {menuItems.map((item, index) => (
                <ItemWrapper key={index} onClick={item.onClick}>
                  <ItemIcon className={item.icon} aria-hidden />
                  <ItemTitle>
                    {item.title}
                  </ItemTitle>
                </ItemWrapper>
              ))}
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
};

export default Temp;
