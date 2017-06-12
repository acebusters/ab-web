import React from 'react';

import ActionButton from './ActionButton';
import ButtonNull from './ButtonNull';

const ButtonFold = (props) => {
  const {
    amountToCall,
    handleFold,
  } = props;
  if (amountToCall > 0) {
    return (
      <ActionButton
        name="button-fold"
        text="FOLD"
        size="medium"
        onClick={() => handleFold()}
      />
    );
  }
  return <ButtonNull />;
};
ButtonFold.propTypes = {
  amountToCall: React.PropTypes.number,
  handleFold: React.PropTypes.func,
};

export default ButtonFold;
