import React from 'react';

import { FlagBetAmountWrapper } from './styles';

const FlagBetAmount = ({ amount }) => {
  if (!amount) return null;
  return (
    <FlagBetAmountWrapper>
      {amount}
    </FlagBetAmountWrapper>
  );
};
FlagBetAmount.propTypes = {
  amount: React.PropTypes.number.isRequired,
};

export default FlagBetAmount;
