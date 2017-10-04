import React from 'react';
import PropTypes from 'prop-types';

import ModalContainer from './Container';
import ModalDialog from './Dialog';
import ModalsTransitionGroup from './ModalsTransitionGroup';

const Modal = ({ modal, handleClose }) => (
  <ModalsTransitionGroup>
    {modal &&
      <ModalContainer
        style={{ zIndex: 7 }}
        onClick={modal.backdrop ? handleClose : null}
      >
        <ModalDialog handleClose={handleClose}>
          {modal.node}
        </ModalDialog>
      </ModalContainer>
    }
  </ModalsTransitionGroup>
);
Modal.propTypes = {
  modal: PropTypes.shape({
    node: PropTypes.any,
    closeHandler: PropTypes.func,
    backdrop: PropTypes.bool,
  }),
  handleClose: PropTypes.func,
};

export default Modal;
