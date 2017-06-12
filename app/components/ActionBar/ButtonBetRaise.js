import React from 'react';

import ButtonBet from './ButtonBet';
import ButtonBlank from './ButtonBlank';
import ButtonRaise from './ButtonRaise';

const ButtonBetRaise = (props) => {
  const {
    amountToCall,
    myStack,
  } = props;
  if (amountToCall > 0) {
    if (myStack > amountToCall) {
      return <ButtonRaise {...props} />;
    }
    return <ButtonBlank />;
  }
  return <ButtonBet {...props} />;
};
ButtonBetRaise.propTypes = {
  amountToCall: React.PropTypes.number,
  myStack: React.PropTypes.number,
};

export default ButtonBetRaise;
