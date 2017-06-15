import React from 'react';

import { FlagAmountWrapper } from './styles';

const FlagAmount = ({
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
FlagAmount.propTypes = {
  amount: React.PropTypes.number,
  amountToCall: React.PropTypes.number,
  sliderOpen: React.PropTypes.bool,
};

export default FlagAmount;
