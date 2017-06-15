import React from 'react';

import { FlagAmountWrapper } from './styles';

const FlagBetAmount = ({
  amount,
  amountToCall,
  sliderOpen,
}) => {
  // hide flag if only option is to 'check'
  if (amountToCall === 0) return null;
  const text = sliderOpen ? `RAISE ${amount}` : amountToCall;
  return (
    <FlagAmountWrapper sliderOpen={sliderOpen}>
      {text}
    </FlagAmountWrapper>
  );
};
FlagBetAmount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  amountToCall: React.PropTypes.number.isRequired,
  sliderOpen: React.PropTypes.bool.isRequired,
};

export default FlagBetAmount;
