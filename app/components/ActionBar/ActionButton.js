import React from 'react';

import {
  ActionButtonWrapper,
  ActionIndicator,
  ActionText,
} from './styles';

const ActionButton = (props) => {
  const onClick = (e) => {
    if (props.disabled) return;
    props.onClick(e);
  };
  return (
    <ActionButtonWrapper
      name={props.name}
      onClick={onClick}
      size={props.size}
      disabled={props.disabled}
    >
      <ActionIndicator />
      <ActionText>{props.text}</ActionText>
    </ActionButtonWrapper>
  );
};

ActionButton.propTypes = {
  text: React.PropTypes.string,
  size: React.PropTypes.string,
  name: React.PropTypes.string,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
};

export default ActionButton;
