import React from 'react';

import { FlagBet } from './styles';

const FlagAmountBet = ({
  amount,
  sliderOpen,
}) => {
  if (sliderOpen) {
    return (
      <FlagBet sliderOpen={sliderOpen}>
        {amount}
      </FlagBet>
    );
  }
  return null;
};
FlagAmountBet.propTypes = {
  amount: React.PropTypes.number,
  sliderOpen: React.PropTypes.bool,
};

export default FlagAmountBet;
