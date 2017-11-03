import CSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

const enter = 'cards-enter';
const enterActive = 'cards-enter-active';
const timeout = 500;

const BoardWrapper = styled(CSSTransitionGroup).attrs({
  transitionName: { enter, enterActive },
  transitionEnterTimeout: timeout,
  transitionLeave: false,
})`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 255px;
  transform: translate(-50%, -50%);
  z-index: 1001;

  .${enter} {
    opacity: 0;
    transform: translate3d(0, -500%,0 );
    transition: opacity, transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .${enter}:nth-child(2) {
    transition-delay: 0.1s;
  }

  .${enter}:nth-child(3) {
    transition-delay: 0.2s;
  }

  .${enterActive} {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export default BoardWrapper;
