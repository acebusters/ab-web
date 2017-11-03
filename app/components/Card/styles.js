import styled, { keyframes } from 'styled-components';
import { scaleSeat } from '../../utils/styleUtils';
import { smallShadow } from '../../variables';

const flipAnim = keyframes`
  from { transform: rotateY( 0deg ); }
  to { transform: rotateY( 180deg ); }
`;

export const CardStyle = styled.img`
  max-width: 100%;
  height: auto;
  box-shadow: ${smallShadow};
`;

export const BoardFront = styled.div`
  float: left;
  margin-left: 0.5em;
`;

// HoleCards
export const HoleCardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: ${scaleSeat(4)};
  margin-top: ${(props) => (props.empty ? scaleSeat(40) : 0)};

  background-color: none;
`;

export const CardShared = styled.section`
  background-color: none;
  margin-right: ${scaleSeat(2)};
  width: ${scaleSeat(36)};
`;

export const DownContainer = styled(CardShared)`
  height: ${scaleSeat(12)};
  margin-top: ${scaleSeat(28)};
`;

export const UpContainer = styled(CardShared)`
  height: ${scaleSeat(40)};
`;

// FlipCard
export const FlipCardContainer = styled.section`
  height: 100%;
  width: 100%;
  perspective: 200px;
  position: relative;
`;

export const FlipCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  animation: ${flipAnim} 1s;
  transform: rotateY(180deg);
  transform-style: preserve-3d;
  transition: transform 1s;
`;

const FlipCard = styled.figure`
  margin: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

export const CardFront = styled(FlipCard)`
  transform: rotateY(180deg);
`;

export const CardBack = styled(FlipCard)`
`;
