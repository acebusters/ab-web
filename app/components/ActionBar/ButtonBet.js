import React from 'react';

import ActionButton from './ActionButton';
import Slider from './Slider';

import {
  BetWrapper,
  SliderWrapper,
} from './styles';

const ButtonBet = (props) => {
  const {
    // amount,
    handleBet,
    // minRaise,
    // myStack,
    text,
    // updateAmount,
  } = props;
  return (
    <BetWrapper>
      <ActionButton
        name="bet-button"
        text={text}
        onClick={() => handleBet()}
      />
      <SliderWrapper name="slider-wrapper">
        <Slider {...props} />
      </SliderWrapper>
    </BetWrapper>
  );
};
ButtonBet.propTypes = {
  // amount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  // minRaise: React.PropTypes.number,
  // myStack: React.PropTypes.number,
  text: React.PropTypes.string,
  // updateAmount: React.PropTypes.func,
};

export default ButtonBet;
