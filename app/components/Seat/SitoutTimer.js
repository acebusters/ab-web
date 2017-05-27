/**
* Created by jzobro 20170519
*/
import React from 'react';

import {
  TimerBackground,
  TimerBar,
  TimerWrapper,
} from './styles';

const SeatTimer = () => (
  <TimerWrapper>
    <TimerBackground>
      <TimerBar
        type="sitout"
        width={`${100}%`}
      />
    </TimerBackground>
  </TimerWrapper>
);

SeatTimer.propTypes = {
  // sitout: React.PropTypes.number,
};

export default SeatTimer;
