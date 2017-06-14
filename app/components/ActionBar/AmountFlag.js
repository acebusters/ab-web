import React from 'react';

import { AmountFlagWrapper } from './styles';

const AmountFlag = ({ amountToCall }) => {
  if (!amountToCall) return null;
  return (
    <AmountFlagWrapper>
      {amountToCall}
    </AmountFlagWrapper>
  );
};
AmountFlag.propTypes = {
  amountToCall: React.PropTypes.number.isRequired,
};

export default AmountFlag;
