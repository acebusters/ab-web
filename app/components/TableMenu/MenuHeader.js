import React from 'react';

import {
  Hamburger,
  Identicon,
  ItemTitle,
  ItemIcon,
  MenuHeader as HeaderStyle,
  Patty,
} from './styles';

const MenuHeader = ({
  active,
  blocky,
  name,
  handleClick,
  handleMouseUpDown,
  open,
}) => (
  <HeaderStyle
    open={open}
    onClick={handleClick}
    onMouseDown={handleMouseUpDown}
    onMouseUp={handleMouseUpDown}
  >

    {/* if loggedIn render blocky&name, else show 'register'  */}
    {blocky && name ?
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Identicon bgImg={blocky} />
        <ItemTitle>{name}</ItemTitle>
      </div>
      :
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ItemIcon className="fa fa-user-plus" />
        <ItemTitle>Register</ItemTitle>
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
  name: React.PropTypes.string,
  handleMouseUpDown: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default MenuHeader;
