/**
* Created by jzobro 20170520
*/
import React from 'react';

import CardsComponent from './CardsComponent';
import SeatInfo from './SeatInfo';
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
    seatStatus,
  } = props;
  return (
    <SeatWrapper className="seat-wrapper" coords={coords}>
      <SeatContainer className="seat-container" activePlayer={activePlayer}>
        {seatStatus !== 'EMPTY' ?
          <StatusSeatWrapper className="status-seat-wrapper">
            <StatusSeat>{seatStatus}</StatusSeat>
          </StatusSeatWrapper>
          :
          <CardsComponent className="cards-component" {...props} />
        }

        <SeatInfo className="seat-info" {...props} />

        <StatusAction className="status-action" {...props} />

      </SeatContainer>
    </SeatWrapper>
  );
};
Seat.propTypes = {
  activePlayer: React.PropTypes.bool,
  coords: React.PropTypes.array,
  seatStatus: React.PropTypes.string,
};

export default Seat;
