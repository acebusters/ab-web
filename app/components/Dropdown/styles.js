import styled from 'styled-components';
import { Button as ButtonBase } from '../../utils/styleUtils';

// base styles
export const Container = styled.div`
  padding: 4px;
  width: 100%;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
`;

export const Button = styled(ButtonBase)`
  height: 58px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  width: 100%;
  &:hover {
    background-color: yellow;
  }
  &:active {
    background-color: lavender;
  }
`;
