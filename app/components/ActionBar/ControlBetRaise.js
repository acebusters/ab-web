import React from 'react';

import ButtonBet from './ButtonBet';
import ControlBlank from './ControlBlank';

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
  return <ControlBlank />;
};
ControlBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  amount: React.PropTypes.number,
  myStack: React.PropTypes.number,
};

export default ControlBetRaise;
