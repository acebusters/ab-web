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
  const handleConfirmClick = () => {
    setActionBarBetSlider(false);
    handleBet();
  };
  if (sliderOpen) {
    return (
      <ActionButton
        name="bet-button"
        text="CONFIRM"
        onClick={handleConfirmClick}
        {...props}
      />
    );
  }
  if (amountToCall === 0) {
    return (
      <ActionButton
        name="button-bet"
        text="BET"
        onClick={() => setActionBarBetSlider(true)}
        {...props}
      />
    );
  }
  if (myStack > amountToCall) {
    return (
      <ActionButton
        name="button-raise"
        text="RAISE"
        onClick={() => setActionBarBetSlider(true)}
        {...props}
      />
    );
  }
  if (myStack < amountToCall) {
    return (
      <ActionButton
        name="button-all-in"
        text="ALL-IN"
        onClick={handleBet}
        {...props}
      />
    );
  }
  return <ControlBlank />;
};
ControlBetRaise.propTypes = {
  amountToCall: React.PropTypes.number.isRequired,
  handleBet: React.PropTypes.func.isRequired,
  myStack: React.PropTypes.number.isRequired,
  sliderOpen: React.PropTypes.bool.isRequired,
  setActionBarBetSlider: React.PropTypes.func.isRequired,
};

export default ControlBetRaise;
