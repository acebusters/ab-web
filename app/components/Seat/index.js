/**
* Created by jzobro 20170517
*/
import React from 'react';

import Seat from './Seat';
import ButtonJoinSeat from './ButtonJoinSeat';
import ButtonInvite from './ButtonInvite';
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
  } = props;
  if (open) {
    if (myPos === undefined) {
      return (
        <ButtonJoinSeat
          coords={coords}
          onClickHandler={() => isTaken(open, myPos, pending, pos)}
          {...props}
        />
      );
    }
    if (typeof myPos === 'number') {
      return (
        <ButtonInvite
          coords={coords}
          onClickHandler={() => isTaken(open, myPos, pending, pos)}
          {...props}
        />
      );
    }
  }
  return <Seat {...props} />;
};
SeatComponent.propTypes = {
  coords: React.PropTypes.array,
  isTaken: React.PropTypes.func,
  myPos: React.PropTypes.number, // action bar position
  open: React.PropTypes.bool,
  pos: React.PropTypes.number,
  pending: React.PropTypes.bool,
};

export default SeatComponent;
