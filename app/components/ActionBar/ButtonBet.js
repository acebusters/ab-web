import React from 'react';

import ActionButton from './ActionButton';
import Slider from './Slider';

const ButtonBet = ({
  amount, handleBet, minRaise, myStack, text, updateAmount,
}) => (
  <div>
    <ActionButton
      name="bet-button"
      size="medium"
      text={text}
      onClick={() => handleBet()}
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
ButtonBet.propTypes = {
  amount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  minRaise: React.PropTypes.number,
  myStack: React.PropTypes.number,
  text: React.PropTypes.string,
  updateAmount: React.PropTypes.func,
};

export default ButtonBet;
