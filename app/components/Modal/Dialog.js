import React from 'react';
import PropTypes from 'prop-types';

import { DialogWrapper, CloseButton } from './styles';

const ModalDialog = ({ handleClose, children }) => (
  <DialogWrapper>
    {children}

    <CloseButton onClick={handleClose}>
      <svg width="30" height="30">
        <g transform="rotate(45 15 15)">
          <rect x="5" y="14.25" width="20" height="1.5" fill="#000" />
          <rect y="5" x="14.25" height="20" width="1.5" fill="#000" />
        </g>
      </svg>
    </CloseButton>
  </DialogWrapper>
);
ModalDialog.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.func,
};

export default ModalDialog;
