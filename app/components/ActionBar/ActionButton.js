import React from 'react';

import {
  ActionButtonWrapper,
  ActionIndicator,
  ActionText,
} from './styles';

const ActionButton = (props) => {
  const handleThisClick = () => {
    if (props.disabled) return;
    props.setActionBarBetSlider(false);
    props.setActionBarMode(props.newMode);
    props.handleClick();
  };
  return (
    <ActionButtonWrapper
      name={props.name}
      onClick={handleThisClick}
      size={props.size}
      disabled={props.disabled}
    >
      <ActionIndicator />
      <ActionText>{props.text}</ActionText>
    </ActionButtonWrapper>
  );
};

ActionButton.propTypes = {
  disabled: React.PropTypes.bool,
  name: React.PropTypes.string,
  newMode: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  setActionBarMode: React.PropTypes.func,
  setActionBarBetSlider: React.PropTypes.func,
  size: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default ActionButton;
