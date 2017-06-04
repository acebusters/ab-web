import React from 'react';

import {
 MenuItemsWrapper,
 ItemWrapper,
 ItemIcon,
 ItemTitle,
} from './styles';

const MenuItems = (props) => {
  const { items } = props;
  return (
    <MenuItemsWrapper className="menu-items">
      {items.map((item, index) => (
        <ItemWrapper
          disabled={item.disabled}
          key={index}
          onClick={item.onClick}
        >
          <ItemIcon className={item.icon} aria-hidden />
          <ItemTitle>
            {item.title}
          </ItemTitle>
        </ItemWrapper>
      ))}
    </MenuItemsWrapper>
  );
};
MenuItems.propTypes = {
  items: React.PropTypes.array,
};

export default MenuItems;
