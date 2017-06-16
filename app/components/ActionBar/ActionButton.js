import React from 'react';

import {
  ActionButtonWrapper,
  ActionIndicator,
  ActionText,
} from './styles';

const ActionButton = (props) => {
  // disable button if actioBar is not active or if mode matches
  const disabled = !props.active || (props.mode === props.type);
  const handleThisClick = () => {
    if (disabled) return;
    props.setActionBarBetSlider(false);
    props.setActionBarMode(props.type);
    props.handleClick();
  };
  return (
    <ActionButtonWrapper
      name={props.name}
      onClick={handleThisClick}
      disabled={disabled}
    >
      {props.type === 'BET' || props.type === 'RAISE' ? null
        : <ActionIndicator />
      }
      <ActionText type={props.type}>{props.text}</ActionText>
    </ActionButtonWrapper>
  );
};

ActionButton.propTypes = {
  active: React.PropTypes.bool,
  mode: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  setActionBarMode: React.PropTypes.func,
  setActionBarBetSlider: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default ActionButton;
