import React from 'react';

import {
  Hamburger,
  ItemIcon,
  ItemTitle,
  MenuHeader as HeaderStyle,
  Patty,
} from './styles';

const MenuHeader = ({
  btnActive,
  handleClick,
  onMouseDown,
  onMouseUp,
  open,
}) => (
  <HeaderStyle
    open={open}
    onClick={handleClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    <ItemIcon className="fa fa-user-plus" />
    <ItemTitle>Register</ItemTitle>
    <Hamburger>
      <Patty active={btnActive} />
      <Patty active={btnActive} />
      <Patty active={btnActive} />
    </Hamburger>
  </HeaderStyle>
);
MenuHeader.propTypes = {
  btnActive: React.PropTypes.bool,
  onMouseUp: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default MenuHeader;
