/**
* Created by jzobro 20170517
*/
import React from 'react';

import Seat from './Seat';
import ButtonJoinSeat from './ButtonJoinSeat';
/* TODO Remove radial component?
imoprt Radial from '../RadialProgress'
*/

const activePlayer = (seatStatus) => {
  if (seatStatus === 'pending') return false;
  if (seatStatus === 'sitting-in') return false;
  if (seatStatus === 'sit-out') return false;
  return true;
};

const seatStatus = (pending, myPos, sitout) => {
  if (pending) {
    return 'pending';
  } else if (myPos === undefined) {
    return 'sitting-in';
    // TODO add 'Standing-up' logic
  } else if (typeof sitout === 'number') {
    return 'sit-out';
  }
  return 'EMPTY'; // successfully resolves to EMPTY
};

const SeatComponent = (props) => {
  const {
    coords,
    isTaken,
    myPos,
    open,
    pos,
    pending,
    sitout,
  } = props;
  if (open) {
    return (
      <ButtonJoinSeat
        coords={coords}
        onClickHandler={() => isTaken(open, myPos, pending, pos)}
      />
    );
  }
  return (
    <Seat
      activePlayer={activePlayer(seatStatus)}
      seatStatus={seatStatus(pending, myPos, sitout)}
      {...props}
    />
  );
};
SeatComponent.propTypes = {
  coords: React.PropTypes.array,
  isTaken: React.PropTypes.func,
  myPos: React.PropTypes.number, // action bar position
  open: React.PropTypes.bool,
  pos: React.PropTypes.number,
  pending: React.PropTypes.bool,
  sitout: React.PropTypes.number, // amount of time left in sitou
};

export default SeatComponent;
