/**
* Created by jzobro 20170520
*/
import React from 'react';

import Card from '../Card';
import SeatTimer from './SeatTimer';
import StatusAction from './StatusAction';
import Pot from '../Pot';

import { nickNameByAddress } from '../../services/nicknames';
import {
  AvatarImage,
  AmountBox,
  CardContainer,
  ChipButtonContainer,
  DealerButton,
  DetailWrapper,
  InfoWrapper,
  NameBox,
  SeatContainer,
  SeatWrapper,
  StackBox,
  StatusSeat,
  StatusSeatWrapper,
} from './styles';

// const componentSize = 'small'; // small, medium, large
const cardSize = 48;

const stackToString = (stackSize) => {
  if (!stackSize) return '0';
  return stackSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const showChipsButton = (pending, seatStatus) => {
  if (pending) return false;
  if (seatStatus === 'sit-out' ||
    seatStatus === 'sitting-in' ||
    seatStatus === 'standing-up') return false;
  return true;
};

const Seat = (props) => {
  const {
    activePlayer,
    amountCoords,
    dealer,
    coords,
    blocky,
    folded,
    holeCards,
    lastAction,
    lastAmount,
    pending,
    pos,
    seatStatus,
    signerAddr,
    sitout,
    stackSize,
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

        <InfoWrapper>
          {showChipsButton(pending, seatStatus) ?
            <ChipButtonContainer>
              <DealerButton dealer={dealer} pos={pos}>D</DealerButton>

              <AmountBox amountCoords={amountCoords}>
                { (lastAmount > 0) &&
                  <Pot potSize={lastAmount} left="0%" top="0%" />
                }
              </AmountBox>
            </ChipButtonContainer>
            : null
          }

          <AvatarImage bgImg={blocky} />

          <DetailWrapper>
            <NameBox>{nickNameByAddress(signerAddr)}</NameBox>
            <StackBox>{stackToString(stackSize)}</StackBox>
          </DetailWrapper>
        </InfoWrapper>

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
  amountCoords: React.PropTypes.array,
  blocky: React.PropTypes.string,
  coords: React.PropTypes.array,
  dealer: React.PropTypes.number, // which seat is dealer
  folded: React.PropTypes.bool,
  holeCards: React.PropTypes.array, // array of cards
  lastAction: React.PropTypes.string,
  lastAmount: React.PropTypes.number,
  pending: React.PropTypes.bool,
  pos: React.PropTypes.number, // which position is THIS seat
  seatStatus: React.PropTypes.string,
  signerAddr: React.PropTypes.string,
  sitout: React.PropTypes.number,
  stackSize: React.PropTypes.number,
  timeLeft: React.PropTypes.number, // progress 0 - 1
};

export default Seat;
