import React from 'react';

import ActionButton from './ActionButton';

const ButtonCheckCall = (props) => {
  const {
    amountToCall,
    callAmount,
    handleCall,
    handleCheck,
  } = props;
  if (amountToCall > 0) {
    return (
      <ActionButton
        name="call"
        text={`CALL ${callAmount}`}
        size="medium"
        onClick={() => handleCall()}
      />
    );
  }
  // if amountToCall === 0, or undefined, or null
  return (
    <ActionButton
      name="check"
      text="CHECK"
      size="medium"
      onClick={() => handleCheck()}
    />
  );
};
ButtonCheckCall.propTypes = {
  amountToCall: React.PropTypes.number,
  callAmount: React.PropTypes.number,
  handleCall: React.PropTypes.func,
  handleCheck: React.PropTypes.func,
};

export default ButtonCheckCall;
