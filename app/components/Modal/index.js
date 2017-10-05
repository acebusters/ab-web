import React from 'react';
import PropTypes from 'prop-types';
import JoinDialog from 'containers/JoinDialog';
import UpgradeDialog from 'containers/UpgradeDialog';
import { JOIN_DIALOG, UPGRADE_DIALOG } from 'containers/Modal/constants';
import ModalsTransitionGroup from './ModalsTransitionGroup';
import { DialogTransitionGroup } from './DialogTransitionGroup';
import { ContainerTransitionGroup } from './ContainerTransitionGroup';

import {
  DialogWrapper,
  CloseButton,
  Wrapper,
  Background,
  Modals,
} from './styles';

const XButton = () => (
  <svg width="30" height="30">
    <g transform="rotate(45 15 15)">
      <rect x="5" y="14.25" width="20" height="1.5" fill="#000" />
      <rect y="5" x="14.25" height="20" width="1.5" fill="#000" />
    </g>
  </svg>
);

const MODALS = {
  [JOIN_DIALOG]: JoinDialog,
  [UPGRADE_DIALOG]: UpgradeDialog,
};

const Modal = ({ modal, handleClose }) => {
  let SpecifiedModal; // required for leaveAnim
  if (modal) {
    SpecifiedModal = MODALS[modal.modalType];
  }
  return (
    <ModalsTransitionGroup>
      {modal && // required for leaveAnim
        <ContainerTransitionGroup component={Wrapper} style={{ zIndex: 7 }}>
          <DialogTransitionGroup component={Modals}>
            <Background onClick={modal.modalProps.backdrop ? handleClose : null} />
            <DialogWrapper>
              <SpecifiedModal {...modal.modalProps} />
              <CloseButton onClick={handleClose}>
                <XButton />
              </CloseButton>
            </DialogWrapper>
          </DialogTransitionGroup>
        </ContainerTransitionGroup>
      }
    </ModalsTransitionGroup>
  );
};
Modal.propTypes = {
  modal: PropTypes.shape({
    modalType: PropTypes.string,
    modalProps: PropTypes.object,
    backdrop: PropTypes.bool,
  }),
  handleClose: PropTypes.func,
};

export default Modal;
