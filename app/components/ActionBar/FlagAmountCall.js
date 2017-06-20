import React from 'react';

import { FlagCall } from './styles';

const FlagAmountCall = ({
  amountToCall,
  sliderOpen,
  myStack,
}) => {
  // hide flag if only option is to 'check' or 'all-in'
  const hide = amountToCall === 0 || amountToCall > myStack;
  return (
    <FlagCall hide={hide} sliderOpen={sliderOpen}>
      {amountToCall}
    </FlagCall>
  );
};
FlagAmountCall.propTypes = {
  amountToCall: React.PropTypes.number,
  myStack: React.PropTypes.number,
  sliderOpen: React.PropTypes.bool,
};

export default FlagAmountCall;
