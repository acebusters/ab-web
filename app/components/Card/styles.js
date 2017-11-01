import styled, { keyframes } from 'styled-components';
import { scaleSeat } from '../../utils/styleUtils';
import { smallShadow } from '../../variables';

const boardCardEnterAnim = keyframes`
  0% {
    opacity: 0.3;
    transform: translateY(-500%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

// BoardCards
export const BoardWrapper = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 255px;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

export const BoardFront = styled.div`
  float: left;
  margin-left: 0.5em;
  animation: ${boardCardEnterAnim} 0.6s cubic-bezier(0.57, 0.2, 0.75, 1.1);
`;

// HoleCards
export const HoleCardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: ${scaleSeat(4)};
  margin-top: ${(props) => props.empty ? scaleSeat(40) : 0};

  background-color: none;
`;

export const CardShared = styled.div`
  background-color: none;
  margin-right: ${scaleSeat(2)};
  width:${scaleSeat(36)};
`;

export const HoleBack = styled(CardShared)`
  margin-top: ${scaleSeat(28)};
  height: ${scaleSeat(12)};
`;

export const HoleFront = styled(CardShared)`
  height: ${scaleSeat(40)};
`;

export const CardStyle = styled.img`
  max-width: 100%;
  height: auto;
  box-shadow: ${smallShadow};
`;
