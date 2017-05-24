/**
* Created by jzobro 20170517
*/
import React from 'react';

import Seat from './Seat';
import ButtonJoinSeat from './ButtonJoinSeat';
/* TODO Remove radial component?
imoprt Radial from '../RadialProgress'
*/

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
  let seatStatus = '';
  let seat = null;

  if (pending) {
    seatStatus = 'pending';
  } else if (myPos === undefined) {
    seatStatus = 'sitting-in';
    // TODO add 'Standing-up' logic
  } else if (typeof sitout === 'number') {
    seatStatus = 'sit-out';
  } else {
    seatStatus = 'EMPTY'; // successfully resolves to EMPTY
  }

  if (open) {
    seat = (
      <ButtonJoinSeat
        coords={coords}
        onClickHandler={() => isTaken(open, myPos, pending, pos)}
      />
    );
  } else {
    /* TODO: remove because action is tracked by timeLeft and activePlayer?
    let color;
    if (['showdown'].indexOf(props.state) === -1
          && props.pos === props.whosTurn) {
      color = green;
    } else if (typeof props.sitout === 'number') {
      color = gray;
    } else {
      color = 'blue';
    }
    */
    seat = (
      <Seat seatStatus={seatStatus} {...props} />
    );
  }
  return seat;
};
SeatComponent.propTypes = {
  coords: React.PropTypes.array,
  folded: React.PropTypes.bool,
  isTaken: React.PropTypes.func,
  myPos: React.PropTypes.number, // action bar position
  open: React.PropTypes.bool,
  pos: React.PropTypes.number,
  pending: React.PropTypes.bool,
  sitout: React.PropTypes.number, // amount of time left in sitou
};


export default SeatComponent;
