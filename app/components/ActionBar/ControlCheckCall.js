import React from 'react';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

import { ControlWrapper } from './styles';

const ControlCheckCall = (props) => {
  const {
    amountToCall,
    handleCall,
    handleCheck,
    myStack,
  } = props;
  if (amountToCall > myStack) {
    return <ControlBlank />;
  }
  if (amountToCall > 0) {
    return (
      <ControlWrapper>
        <ActionButton
          name="button-call"
          text="CALL"
          size="medium"
          onClick={handleCall}
        />
      </ControlWrapper>
    );
  }
  // if amountToCall === 0, or undefined, or null
  return (
    <ControlWrapper>
      <ActionButton
        name="button-check"
        text="CHECK"
        size="medium"
        onClick={handleCheck}
      />
    </ControlWrapper>
  );
};
ControlCheckCall.propTypes = {
  amountToCall: React.PropTypes.number,
  handleCall: React.PropTypes.func,
  handleCheck: React.PropTypes.func,
  myStack: React.PropTypes.number,
};

export default ControlCheckCall;
