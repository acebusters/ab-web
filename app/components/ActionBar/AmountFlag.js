import React from 'react';

import { AmountFlagWrapper } from './styles';

const AmountFlag = ({ amount }) => {
  if (!amount) return null;
  return (
    <AmountFlagWrapper>
      {amount}
    </AmountFlagWrapper>
  );
};
AmountFlag.propTypes = {
  amount: React.PropTypes.number,
};

export default AmountFlag;
