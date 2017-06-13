import React from 'react';

import ActionButton from './ActionButton';

import { ControlWrapper } from './styles';

const ControlBlank = () => (
  <ControlWrapper>
    <ActionButton
      name="button-blank"
      text=""
      size="medium"
    />
  </ControlWrapper>
);

export default ControlBlank;
