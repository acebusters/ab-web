import React from 'react';
import PropTypes from 'prop-types';

import SubmitButton from 'components/SubmitButton';

const ConfirmDialog = ({ msg, buttonText, onSubmit }) => (
  <div>
    <p>{msg}</p>
    <SubmitButton onClick={onSubmit}>
      {buttonText}
    </SubmitButton>
  </div>
);
ConfirmDialog.propTypes = {
  msg: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmDialog;
