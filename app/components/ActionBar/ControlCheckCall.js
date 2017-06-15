import React from 'react';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';


const ControlCheckCall = ({
  amountToCall,
  handleCall,
  handleCheck,
  myStack,
}) => {
  if (amountToCall > myStack) {
    return <ControlBlank />;
  }
  if (amountToCall > 0) {
    return (
      <ActionButton
        name="button-call"
        text="CALL"
        size="medium"
        onClick={handleCall}
      />
    );
  }
  if (amountToCall === 0) {
    return (
      <ActionButton
        name="button-check"
        text="CHECK"
        size="medium"
        onClick={handleCheck}
      />
    );
  }
  return <ControlBlank />;
};
ControlCheckCall.propTypes = {
  amountToCall: React.PropTypes.number.isRequired,
  handleCall: React.PropTypes.func.isRequired,
  handleCheck: React.PropTypes.func.isRequired,
  myStack: React.PropTypes.number.isRequired,
};

export default ControlCheckCall;
