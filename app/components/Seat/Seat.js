/**
* Created by jzobro 20170520
*/
import React from 'react';

import CardContainer from './CardContainer';
import SeatInfo from './SeatInfo';
import SeatTimer from './SeatTimer';
import StatusAction from './StatusAction';

import {
  SeatContainer,
  SeatWrapper,
  StatusSeat,
  StatusSeatWrapper,
} from './styles';

const Seat = (props) => {
  const {
    activePlayer,
    coords,
    lastAction,
    seatStatus,
    sitout,
    timeLeft,
  } = props;
  return (
    <SeatWrapper coords={coords}>
      <SeatContainer activePlayer={activePlayer}>
        {seatStatus !== 'EMPTY' ?
          <StatusSeatWrapper>
            <StatusSeat>{seatStatus}</StatusSeat>
          </StatusSeatWrapper>
          :
          <CardContainer {...props} />
        }

        <SeatInfo {...props} />

        {lastAction ? <StatusAction {...props} /> : null }

        {(timeLeft > 0) || (sitout) ?
          <SeatTimer
            timerProgress={sitout || timeLeft}
            timerType={(sitout > 0) ? 'sitout' : 'action'}
          />
          : null
        }
      </SeatContainer>
    </SeatWrapper>
  );
};
Seat.propTypes = {
  activePlayer: React.PropTypes.bool,
  coords: React.PropTypes.array,
  lastAction: React.PropTypes.string,
  seatStatus: React.PropTypes.string,
  sitout: React.PropTypes.number,
  timeLeft: React.PropTypes.number, // progress 0 - 1
};

export default Seat;
