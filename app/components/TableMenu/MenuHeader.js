import React from 'react';
import { createBlocky } from '../../services/blockies';
import { nickNameByAddress } from '../../services/nicknames';

import {
  Hamburger,
  Identicon,
  MenuHeader as HeaderStyle,
  NickName,
  Patty,
} from './styles';

const MenuHeader = ({
  btnActive,
  signerAddr,
  onToggleMenu,
  onMouseDown,
  onMouseUp,
  open,
}) => {
  const name = nickNameByAddress(signerAddr);
  const blocky = createBlocky(signerAddr);
  return (
    <HeaderStyle
      open={open}
      onClick={onToggleMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Identicon bgImg={blocky} />
      <NickName>{name}</NickName>
      <Hamburger>
        <Patty active={btnActive} />
        <Patty active={btnActive} />
        <Patty active={btnActive} />
      </Hamburger>
    </HeaderStyle>
  );
};
MenuHeader.propTypes = {
  btnActive: React.PropTypes.bool,
  signerAddr: React.PropTypes.string,
  onMouseUp: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onToggleMenu: React.PropTypes.func,
  open: React.PropTypes.bool,
};

export default MenuHeader;
