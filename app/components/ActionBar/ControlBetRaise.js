import React from 'react';

import ActionButton from './ActionButton';
import ButtonBet from './ButtonBet';
import ControlBlank from './ControlBlank';

import { ControlWrapper } from './styles';


const ControlBetRaise = (props) => {
  const {
    amountToCall,
    amount,
    handleBet,
    myStack,
  } = props;
  if (amountToCall === 0) {
    return (
      <ControlWrapper>
        <ButtonBet
          text={`BET ${amount}`}
          {...props}
        />
      </ControlWrapper>
    );
  }
  if (myStack > amountToCall) {
    return (
      <ControlWrapper>
        <ButtonBet
          text={`RAISE ${amount}`}
          {...props}
        />
      </ControlWrapper>
    );
  }
  if (myStack < amountToCall) {
    return (
      <ControlWrapper>
        <ActionButton
          name="button-all-in"
          text="All-In"
          onClick={handleBet}
          {...props}
        />
      </ControlWrapper>
    );
  }
  return <ControlBlank />;
};
ControlBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  amount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  myStack: React.PropTypes.number,
};

export default ControlBetRaise;
