import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

import {
  ALL_IN,
  BET_SET,
  BET,
} from '../../containers/ActionBar/actions';

const ControlBetRaise = (props) => {
  const {
    amount,
    amountToCall,
    minRaise,
    myStack,
    sliderOpen,
  } = props;
  const allIn = myStack <= amountToCall || myStack <= minRaise;
  const bet = amountToCall === 0;
  const raise = myStack > amountToCall;
  // after clicking BET or RAISE buttons, the slider will open
  // and display buttons with indicators
  if (sliderOpen) {
    if (bet) {
      return (
        <ActionButton
          name="button-bet-confirm"
          text={amount === myStack ? 'All-In' : 'Bet'}
          type={BET}
          {...props}
        />
      );
    }
    return (
      <ActionButton
        name="button-raise-confirm"
        text={amount === myStack ? 'All-In' : 'Raise'}
        type={BET}
        {...props}
      />
    );
  }

  // ActionBar will initially present these button options
  if (allIn) {
    return (
      <ActionButton
        name="button-all-in"
        text="All-In"
        type={ALL_IN}
        {...props}
      />
    );
  }
  if (bet) {
    return (
      <ActionButton
        name="button-bet"
        text="Bet"
        type={BET_SET}
        {...props}
      />
    );
  }
  if (raise) {
    return (
      <ActionButton
        name="button-raise"
        text="Raise"
        type={BET_SET}
        {...props}
      />
    );
  }
  return <ControlBlank {...props} />;
};
ControlBetRaise.propTypes = {
  amount: PropTypes.number,
  amountToCall: PropTypes.number,
  minRaise: PropTypes.number,
  myStack: PropTypes.number,
  sliderOpen: PropTypes.bool,
};

export default ControlBetRaise;
