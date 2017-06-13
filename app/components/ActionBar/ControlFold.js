import React from 'react';

import ActionButton from './ActionButton';
import ControlBlank from './ControlBlank';

import {
  ControlWrapper,
} from './styles';

const ControlFold = (props) => {
  const {
    amountToCall,
    handleFold,
  } = props;
  if (amountToCall > 0) {
    return (
      <ControlWrapper>
        <ActionButton
          name="button-fold"
          text="FOLD"
          size="medium"
          onClick={() => handleFold()}
        />
      </ControlWrapper>
    );
  }
  return <ControlBlank />;
};
ControlFold.propTypes = {
  amountToCall: React.PropTypes.number,
  handleFold: React.PropTypes.func,
};

export default ControlFold;
