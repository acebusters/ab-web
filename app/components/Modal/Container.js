import React from 'react';
import PropTypes from 'prop-types';

import { DialogTransitionGroup } from './DialogTransitionGroup';
import { ContainerTransitionGroup } from './ContainerTransitionGroup';

import { Wrapper, Background, Modals } from './styles';

const ModalContainer = ({ children, ...props }) => (
  <ContainerTransitionGroup component={Wrapper} {...props}>
    <Background />
    <DialogTransitionGroup component={Modals}>
      {children}
    </DialogTransitionGroup>
  </ContainerTransitionGroup>
);

ModalContainer.propTypes = {
  children: PropTypes.any,
};

export default ModalContainer;
