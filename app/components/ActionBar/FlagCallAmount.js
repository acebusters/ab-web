import React from 'react';

import {
  FlagCallAmountWrapper,
} from './styles';

const FlagCallAmount = ({ amountToCall }) => {
  if (!amountToCall) return null;
  return (
    <FlagCallAmountWrapper>
      {amountToCall}
    </FlagCallAmountWrapper>
  );
};
FlagCallAmount.propTypes = {
  amountToCall: React.PropTypes.number.isRequired,
};

export default FlagCallAmount;
