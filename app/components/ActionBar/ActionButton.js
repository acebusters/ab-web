import React from 'react';

import {
  ActionButtonWrapper,
  ActionIndicator,
  ActionText,
} from './styles';

const ActionButton = (props) => {
  const {
    active,
    handleClick,
    mode,
    name,
    setActionBarMode,
    setActionBarBetSlider,
    type,
    text,
  } = props;
  // highlight button if selected
  const selected = (mode === type);
  // disable button if actioBar is not active or if mode matches
  const disabled = !active || props.disabled || selected;
  const handleThisClick = () => {
    if (disabled) return;
    setActionBarBetSlider(false);
    setActionBarMode(type);
    handleClick();
  };
  return (
    <ActionButtonWrapper
      name={name}
      onClick={handleThisClick}
      disabled={disabled}
    >
      {type === 'BET-SET' || type === 'RAISE-SET' ? null
        : <ActionIndicator active={selected} />
      }
      <ActionText type={type}>{text}</ActionText>
    </ActionButtonWrapper>
  );
};

ActionButton.propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  mode: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  handleClick: React.PropTypes.func,
  setActionBarMode: React.PropTypes.func,
  setActionBarBetSlider: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default ActionButton;
