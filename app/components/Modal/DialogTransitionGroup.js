import CSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

const appear = 'modal-appear';
const appearActive = 'modal-appear-active';
const appearTimeout = 200;

export const DialogTransitionGroup = styled(CSSTransitionGroup).attrs({
  transitionName: { appear, appearActive },
  transitionAppear: true,
  transitionAppearTimeout: appearTimeout,
})`
  .${appear} {
    transform: scale(1.15);
  }

  .${appearActive} {
    transform: scale(1);
    transition: transform ${appearTimeout}ms ease-in;
  }
`;
