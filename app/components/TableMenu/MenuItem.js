import React from 'react';

import {
 ItemWrapper,
 ItemIcon,
 ItemTitle,
} from './styles';

const MenuItems = (props) => {
  const { item } = props;
  return (
    <ItemWrapper
      name={item.name}
      disabled={item.disabled}
      onClick={item.onClick}
    >
      <ItemIcon className={item.icon} aria-hidden />
      <ItemTitle>
        {item.title}
      </ItemTitle>
    </ItemWrapper>
  );
};
MenuItems.propTypes = {
  item: React.PropTypes.object,
};

export default MenuItems;
