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
  // disable button if actioBar is not active or if mode matches
  const disabled = !active || (mode === type);
  const handleThisClick = () => {
    if (disabled) return;
    setActionBarBetSlider(false);
    setActionBarMode(type);
    handleClick();
  };
  const isActive = mode === type;
  return (
    <ActionButtonWrapper
      name={name}
      onClick={handleThisClick}
      disabled={disabled}
    >
      {type === 'BET' || type === 'RAISE' ? null
        : <ActionIndicator active={isActive} />
      }
      <ActionText type={type}>{text}</ActionText>
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
