import React from 'react';

import ButtonBet from './ButtonBet';
import ButtonBlank from './ButtonBlank';

import { ControlWrapper } from './styles';

const ControlBetRaise = (props) => {
  const {
    amountToCall,
    amount,
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
  return <ButtonBlank />;
};
ControlBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  amount: React.PropTypes.number,
  myStack: React.PropTypes.number,
};

export default ControlBetRaise;
