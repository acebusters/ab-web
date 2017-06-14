import React from 'react';

import {
  FlagButtonWrapper,
} from './styles';

const FlagButton = (props) => {
  const {
    type,
  } = props;
  const textType = () => {
    if (type === 'quarter') return '1/4';
    if (type === 'half') return '1/2';
    return 'Pot';
  };
  return (
    <FlagButtonWrapper name="flag-button">
      {textType()}
    </FlagButtonWrapper>
  );
};
FlagButton.propTypes = {
  type: React.PropTypes.string.isRequired,
};

export default FlagButton;
