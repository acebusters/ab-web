import React from 'react';

import ActionButton from './ActionButton';
import Slider from '../Slider';

const ButtonRaise = ({
  amount, handleBet, minRaise, myStack, updateAmount,
}) => (
  <div>
    <ActionButton
      name="raise-button"
      size="medium"
      onClick={() => handleBet()}
      text={`RAISE ${amount}`}
    />
    <Slider
      data-orientation="vertical"
      value={amount}
      min={minRaise}
      max={myStack}
      step={1}
      onChange={updateAmount}
    />
  </div>
);
ButtonRaise.propTypes = {
  amount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  minRaise: React.PropTypes.number,
  myStack: React.PropTypes.number,
  updateAmount: React.PropTypes.func,
};

export default ButtonRaise;
