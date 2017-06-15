import React from 'react';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

const ControlFold = ({
  amountToCall,
  handleFold,
}) => {
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
  return <ControlBlank />;
};
ControlFold.propTypes = {
  amountToCall: React.PropTypes.number.isRequired,
  handleFold: React.PropTypes.func.isRequired,
};

export default ControlFold;
