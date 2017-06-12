import React from 'react';

import ButtonBet from './ButtonBet';
import ButtonBlank from './ButtonBlank';

const ButtonBetRaise = (props) => {
  const {
    amountToCall,
    amount,
    myStack,
  } = props;
  if (amountToCall === 0) {
    return (
      <ButtonBet
        text={`BET ${amount}`}
        {...props}
      />
    );
  }
  if (myStack > amountToCall) {
    return (
      <ButtonBet
        text={`RAISE ${amount}`}
        {...props}
      />
    );
  }
  return <ButtonBlank />;
};
ButtonBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  amount: React.PropTypes.number,
  myStack: React.PropTypes.number,
};

export default ButtonBetRaise;
