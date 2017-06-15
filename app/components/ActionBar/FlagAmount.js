import React from 'react';

import { FlagAmountWrapper } from './styles';

const FlagBetAmount = ({
  amount,
  amountToCall,
  sliderOpen,
}) => {
  // hide flag if only option is to 'check'
  if (!sliderOpen) {
    if (amountToCall === 0) return null;
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
FlagBetAmount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  amountToCall: React.PropTypes.number.isRequired,
  sliderOpen: React.PropTypes.bool.isRequired,
};

export default FlagBetAmount;
