import styled from 'styled-components';
import { Button as ButtonBase } from '../../utils/styleUtils';

const fontColor = '#979797';


// Dropdown base styles
export const Container = styled.div`
  padding: 4px;
  width: 100%;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
`;

export const Button = styled(ButtonBase)`
  display: flex;
  align-items: center;
  height: 58px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  width: 100%;
  color: ${fontColor};
  &:hover {
    background-color: yellow;
  }
  &:active {
    background-color: lavender;
  }
`;

export const Caret = styled.i`
  margin-left: auto;
  padding-left: 10px;
  &:before {
    font-size: 1.5em;
  }
`;

// Modal
export const ModalButton = styled(Button)`
  margin-top: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

// Token Button
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

export const TokenContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 240px;
`;

export const TokenWrapperLeft = styled(Wrapper)`
`;

export const TokenIcon = styled.div`
  align-self: center;
  justify-content: center;
`;

export const TokenName = styled.div`
  margin-left: 12px;
`;

export const TokenWrapperRight = styled(Wrapper)`
  margin-left: auto;
`;

export const TokenAmount = styled.div``;

export const TokenUnit = styled.div`
  margin-left: 12px;
`;

// Toggle Button
export const ToggleContainer = styled(Container)`
  height: 100%;
  background-color: #ddd;
`;

export const ToggleButton = styled(Button)`
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  padding: 0;
  margin: 0;
  background: none;
  box-shadow: none;
`;

export const ToggleOption = styled.div`
  flex: auto;
  padding: 5px;
  ${(props) => props.selected ?
    `
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    `
    :
    null
  };
  color: ${fontColor};
  font-size: 1.1em;
`;
