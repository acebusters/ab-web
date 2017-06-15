import React from 'react';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

const ControlBetRaise = (props) => {
  const {
    amountToCall,
    handleBet,
    myStack,
    sliderOpen,
    setActionBarBetSlider,
  } = props;
  if (sliderOpen) {
    return (
      <ActionButton
        name="bet-button"
        text="CONFIRM"
        newMode={null}
        handleClick={() => handleBet()}
        {...props}
      />
    );
  }
  if (amountToCall === 0) {
    return (
      <ActionButton
        name="button-bet"
        text="BET"
        newMode="BET"
        handleClick={() => setActionBarBetSlider(true)}
        {...props}
      />
    );
  }
  if (myStack > amountToCall) {
    return (
      <ActionButton
        name="button-raise"
        text="RAISE"
        newMode="RAISE"
        handleClick={() => setActionBarBetSlider(true)}
        {...props}
      />
    );
  }
  if (myStack < amountToCall) {
    return (
      <ActionButton
        name="button-all-in"
        text="ALL-IN"
        newMode="ALL-IN"
        handleClick={() => handleBet()}
        {...props}
      />
    );
  }
  return <ControlBlank {...props} />;
};
ControlBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  myStack: React.PropTypes.number,
  sliderOpen: React.PropTypes.bool,
  setActionBarBetSlider: React.PropTypes.func,
};

export default ControlBetRaise;
