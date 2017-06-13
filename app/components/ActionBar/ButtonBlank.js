import React from 'react';

import ActionButton from './ActionButton';

import { ControlWrapper } from './styles';

const ButtonBlank = () => (
  <ControlWrapper>
    <ActionButton
      name="button-null"
      text="blank"
      size="medium"
    />
  </ControlWrapper>
);

export default ButtonBlank;
