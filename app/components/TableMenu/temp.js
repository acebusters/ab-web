import React from 'react';
import {
 Container,
 Hamburger,
 Identicon,
 Logo,
 LogoWrapper,
 MenuHeader,
 NickName,
 Patty,
} from './styles';

class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      myPos: 1, // myPos === -1, then not at table
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick() {
    // console.log('hello');
  }
  render() {
    const { myPos, menuOpen } = this.state;
    if (myPos > -1) {
      return (
        <Container>
          <LogoWrapper>
            <Logo>AceBusters Logo</Logo>
          </LogoWrapper>
          {!menuOpen ?
            <MenuHeader onClick={() => this.handleMenuClick()}>
              <Identicon />
              <NickName>Nick</NickName>
              <Hamburger>
                <Patty />
                <Patty />
                <Patty />
              </Hamburger>
            </MenuHeader>
            :
            null
          }
        </Container>
      );
    }
    return null;
  }
}

export default Temp;
