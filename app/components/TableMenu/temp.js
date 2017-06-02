import React from 'react';

import { createBlocky } from '../../services/blockies';
// import { nickNameByAddress } from '../../services/nicknames';
import {
 Container,
 Hamburger,
 Identicon,
 ItemWrapper,
 ItemIcon,
 ItemTitle,
 Logo,
 LogoWrapper,
 MenuContainer,
 MenuHeader,
 NickName,
 Patty,
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
      open: true,
      myPos: 1, // myPos === -1, then not at table
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ open: !this.state.open });
    // console.log('hello');
  }
  render() {
    const { myPos, open } = this.state;
    const { signerAddr } = this.props;
    // const name = nickNameByAddress(signerAddr);
    const blocky = createBlocky(signerAddr);
    if (myPos > -1) {
      return (
        <Container>
          <LogoWrapper>
            <Logo>AceBusters Logo</Logo>
          </LogoWrapper>
          {!open ?
            <MenuContainer>
              <MenuHeader onClick={() => this.toggleMenu()}>
                <Identicon bgImg={blocky} />
                <NickName>dklasjdklfjasldkjfalsdk</NickName>
                <Hamburger>
                  <Patty />
                  <Patty />
                  <Patty />
                </Hamburger>
              </MenuHeader>
            </MenuContainer>
            :
            <MenuContainer>
              <MenuHeader onClick={() => this.toggleMenu()}>
                <Identicon bgImg={blocky} />
                <NickName>dklasjdklfjasldkjfalsdk</NickName>
                <Hamburger>
                  <Patty />
                  <Patty />
                  <Patty />
                </Hamburger>
              </MenuHeader>
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
