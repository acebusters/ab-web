import React from 'react';

import ActionButton from './ActionButton';

const ControlBlank = (props) => (
  <ActionButton
    name="button-blank"
    text=""
    disabled
    {...props}
  />
);

export default ControlBlank;
