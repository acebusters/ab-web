/**
* Created by jzobro 20170520
*/
import React from 'react';

import Card from '../Card';
import SeatInfo from './SeatInfo';
import SeatTimer from './SeatTimer';
import StatusAction from './StatusAction';

import {
  CardContainer,
  SeatContainer,
  SeatWrapper,
  StatusSeat,
  StatusSeatWrapper,
} from './styles';

// const componentSize = 'small'; // small, medium, large
const cardSize = 48;

const Seat = (props) => {
  const {
    activePlayer,
    coords,
    folded,
    holeCards,
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
          <CardContainer>
            <Card
              cardNumber={holeCards[0]}
              folded={folded}
              size={cardSize}
            />
            <Card
              cardNumber={holeCards[1]}
              folded={folded}
              size={cardSize}
            />
          </CardContainer>
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
  folded: React.PropTypes.bool,
  holeCards: React.PropTypes.array, // array of cards
  lastAction: React.PropTypes.string,
  seatStatus: React.PropTypes.string,
  sitout: React.PropTypes.number,
  timeLeft: React.PropTypes.number, // progress 0 - 1
};

export default Seat;
