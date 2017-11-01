import styled from 'styled-components';

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
`;
