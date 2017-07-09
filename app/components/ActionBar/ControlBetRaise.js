import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

import {
  ALL_IN,
  BET_SET,
  BET_EDIT,
  BET_CONFIRM,
  RAISE_SET,
  RAISE_EDIT,
  RAISE_CONFIRM,
} from '../../containers/ActionBar/actions';

const ControlBetRaise = (props) => {
  const {
    amount,
    amountToCall,
    minRaise,
    mode,
    myStack,
    sliderOpen,
  } = props;
  // after clicking BET or RAISE buttons, the slider will open
  // and display buttons with indicators
  if (sliderOpen) {
    if (mode === BET_SET) {
      return (
        <ActionButton
          name="button-bet-confirm"
          text={amount === myStack ? 'All-In' : 'Bet'}
          type={BET_CONFIRM}
          {...props}
        />
      );
    }
    return (
      <ActionButton
        name="button-raise-confirm"
        text={amount === myStack ? 'All-In' : 'Raise'}
        type={RAISE_CONFIRM}
        {...props}
      />
    );
  }

  // after confirming the raise amount in the slider,
  // the buttons will change to (in the future)
  // edit they raise or bet amount
  if (mode === RAISE_CONFIRM) {
    return (
      <ActionButton
        name="button-raise-edit"
        text={amount === myStack ? 'All-In' : 'Raise'}
        type={RAISE_EDIT}
        {...props}
      />
    );
  }
  if (mode === BET_CONFIRM) {
    return (
      <ActionButton
        name="button-bet-edit"
        text={amount === myStack ? 'All-In' : 'Bet'}
        type={BET_EDIT}
        {...props}
      />
    );
  }

  // ActionBar will initially present these button options
  if (myStack <= amountToCall || myStack <= minRaise) {
    return (
      <ActionButton
        name="button-all-in"
        text="All-In"
        type={ALL_IN}
        {...props}
      />
    );
  }
  if (amountToCall === 0) {
    return (
      <ActionButton
        name="button-bet"
        text="Bet"
        type={BET_SET}
        {...props}
      />
    );
  }
  if (myStack > amountToCall) {
    return (
      <ActionButton
        name="button-raise"
        text="Raise"
        type={RAISE_SET}
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
  mode: PropTypes.string,
  myStack: PropTypes.number,
  sliderOpen: PropTypes.bool,
};

export default ControlBetRaise;
