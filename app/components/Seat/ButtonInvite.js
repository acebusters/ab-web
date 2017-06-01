/**
* Created by jzobro 20170519
*/
import React from 'react';
import {
  ButtonIcon,
  ButtonStyle,
  ButtonText,
  ButtonWrapper,
  SeatWrapper,
} from './styles';

const ButtonInvite = ({ coords, onClickHandler, seatStatus2 }) => (
  <SeatWrapper coords={coords}>
    <ButtonWrapper onClick={onClickHandler}>
      <ButtonStyle>
        <ButtonIcon className="fa fa-envelope" aria-hidden="true" />
        <ButtonText>Invite</ButtonText>
        <div>Status: {seatStatus2.msg}</div>
      </ButtonStyle>
    </ButtonWrapper>
  </SeatWrapper>
);
ButtonInvite.propTypes = {
  onClickHandler: React.PropTypes.func,
  coords: React.PropTypes.array,
  seatStatus2: React.PropTypes.object,
};

export default ButtonInvite;
