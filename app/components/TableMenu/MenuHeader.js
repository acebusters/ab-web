import React from 'react';

import {
  Hamburger,
  Identicon,
  ItemTitle,
  MenuHeader as HeaderStyle,
  Patty,
} from './styles';

const MenuHeader = ({
  active,
  blocky,
  handleClick,
  handleMouseUpDown,
  nickName,
  open,
}) => (
  <HeaderStyle
    open={open}
    onClick={handleClick}
    onMouseDown={handleMouseUpDown}
    onMouseUp={handleMouseUpDown}
  >
    <Identicon name="identicon" bgImg={blocky} />
    <ItemTitle name="item-title">{nickName !== null ? nickName : 'Guest'}</ItemTitle>
    <Hamburger>
      <Patty active={active} />
      <Patty active={active} />
      <Patty active={active} />
    </Hamburger>
  </HeaderStyle>
);

MenuHeader.propTypes = {
  active: React.PropTypes.bool,
  blocky: React.PropTypes.string,
  nickName: React.PropTypes.string,
  handleMouseUpDown: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default MenuHeader;
