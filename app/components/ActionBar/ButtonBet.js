import React from 'react';

import ActionButton from './ActionButton';
import Slider from './Slider';

import {
  BetWrapper,
  SliderWrapper,
} from './styles';

const ButtonBet = (props) => {
  const {
    handleBet,
    text,
    sliderOpen,
    setActionBarBetSlider,
  } = props;
  const handleBetClick = () => {
    setActionBarBetSlider(false);
    handleBet();
  };
  if (sliderOpen) {
    return (
      <BetWrapper>
        <ActionButton
          name="bet-button"
          text="CONFIRM"
          onClick={handleBetClick}
          {...props}
        />
        <SliderWrapper name="slider-wrapper">
          <Slider {...props} />
        </SliderWrapper>
      </BetWrapper>
    );
  }
  return (
    <BetWrapper>
      <ActionButton
        name="bet-button"
        text={text}
        onClick={() => setActionBarBetSlider(true)}
        {...props}
      />
    </BetWrapper>
  );
};
ButtonBet.propTypes = {
  handleBet: React.PropTypes.func.isRequired,
  setActionBarBetSlider: React.PropTypes.func.isRequired,
  sliderOpen: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default ButtonBet;
