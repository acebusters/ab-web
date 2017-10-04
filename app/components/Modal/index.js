import React from 'react';
import PropTypes from 'prop-types';

import ModalContainer from './Container';
import ModalDialog from './Dialog';
import ModalsTransitionGroup from './ModalsTransitionGroup';

const Modal = ({ modal, modalDismiss, handleClose }) => (
  <ModalsTransitionGroup>
    {modal &&
      <ModalContainer
        style={{ zIndex: 7 }}
        onClick={modal.backdrop ? (modal.closeHandler || modalDismiss) : null}
      >
        <ModalDialog handleClose={handleClose}>
          {modal.node}
        </ModalDialog>
      </ModalContainer>
    }
  </ModalsTransitionGroup>
);
Modal.propTypes = {
  modalDismiss: PropTypes.func,
  modal: PropTypes.shape({
    node: PropTypes.any,
    closeHandler: PropTypes.func,
    backdrop: PropTypes.bool,
  }),
  handleClose: PropTypes.func,
};

export default Modal;
