import React from 'react';

import ActionButton from './ActionButton';
import ButtonBet from './ButtonBet';
import ControlBlank from './ControlBlank';

import { ControlWrapper } from './styles';


const ControlBetRaise = (props) => {
  const {
    amountToCall,
    handleBet,
    myStack,
  } = props;
  if (amountToCall === 0) {
    return (
      <ControlWrapper>
        <ButtonBet
          text="BET"
          {...props}
        />
      </ControlWrapper>
    );
  }
  if (myStack > amountToCall) {
    return (
      <ControlWrapper>
        <ButtonBet
          text="RAISE"
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
  handleBet: React.PropTypes.func,
  myStack: React.PropTypes.number,
};

export default ControlBetRaise;
