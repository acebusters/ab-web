import React from 'react';

import ActionButton from './ActionButton';
import Slider from './Slider';

import {
  BetWrapper,
} from './styles';

const ButtonBet = (props) => {
  const {
    handleBet,
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
        <Slider {...props} />
      </BetWrapper>
    );
  }
  return (
    <BetWrapper>
      <ActionButton
        name="bet-button"
        text="RAISE"
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
};

export default ButtonBet;
