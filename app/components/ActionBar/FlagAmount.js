import React from 'react';

import { FlagAmountWrapper } from './styles';

const FlagAmount = ({
  amount,
  amountToCall,
  sliderOpen,
  myStack,
}) => {
  // hide flag if only option is to 'check' or 'all-in'
  if (!sliderOpen) {
    if (amountToCall === 0 || amountToCall > myStack) {
      return null;
    }
    return (
      <FlagAmountWrapper sliderOpen={sliderOpen}>
        {amountToCall}
      </FlagAmountWrapper>
    );
  }
  return (
    <FlagAmountWrapper sliderOpen={sliderOpen}>
      {amountToCall !== 0 ?
          `RAISE ${amount}`
        :
          `BET ${amount}`
        }
    </FlagAmountWrapper>
  );
};
FlagAmount.propTypes = {
  amount: React.PropTypes.number,
  amountToCall: React.PropTypes.number,
  myStack: React.PropTypes.number,
  sliderOpen: React.PropTypes.bool,
};

export default FlagAmount;
