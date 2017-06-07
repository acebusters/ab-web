import React from 'react';

import {
  Hamburger,
  Identicon,
  ItemTitle,
  ItemIcon,
  MenuHeader as HeaderStyle,
  Patty,
} from './styles';

const divStyle = { display: 'flex', alignItems: 'center' };

const MenuHeader = ({
  active,
  blocky,
  handleClick,
  handleMouseUpDown,
  loggedIn,
  name,
  open,
}) => (
  <HeaderStyle
    open={open}
    onClick={handleClick}
    onMouseDown={handleMouseUpDown}
    onMouseUp={handleMouseUpDown}
  >

    {loggedIn ?
      <div style={divStyle}>
        <Identicon bgImg={blocky} />
        <ItemTitle name="item-title">{name}</ItemTitle>
      </div>
      :
      <div style={divStyle}>
        <ItemIcon className="fa fa-user-plus" />
        <ItemTitle name="item-title">Register</ItemTitle>
      </div>
    }

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
  loggedIn: React.PropTypes.bool,
  name: React.PropTypes.string,
  handleMouseUpDown: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default MenuHeader;
