/**
* Created by jzobro 20170519
*/
import React from 'react';

import {
  TimerBackground,
  TimerBar,
  TimerWrapper,
} from './styles';

const timerDisplayColor = (timerType, timerProgress) => {
  if (timerType === 'sitout') return 'sitout';
  if (timerProgress <= 60) return 'active';
  if (timerProgress <= 30) return 'warning';
  if (timerProgress <= 0) return 'danger';
  return 'active';
};

const timerWidth = (timerType, timerProgress) => {
  if (timerType === 'action') return `${timerProgress}%`;
  if (timerType === 'sitout') return '100%';
  return '0%';
};

const SeatTimer = ({ timerProgress, timerType }) => (
  <TimerWrapper>
    <TimerBackground>
      <TimerBar
        type={timerDisplayColor(timerType, timerProgress)}
        width={timerWidth(timerType, timerProgress)}
      />
    </TimerBackground>
  </TimerWrapper>
);

SeatTimer.propTypes = {
  timerProgress: React.PropTypes.number,
  timerType: React.PropTypes.string, // sitout or action
};

export default SeatTimer;
