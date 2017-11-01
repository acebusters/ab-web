import styled, { keyframes } from 'styled-components';

const cardAnim = keyframes`
  0% {
    opacity: 0.3;
    transform: translateY(-500%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const BoardWrapper = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 255px;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

export const CardWrapper = styled.div`
  float: left;
  margin-left: 0.5em;
  animation: ${cardAnim} 0.6s cubic-bezier(0.57, 0.2, 0.75, 1.1);
`;
