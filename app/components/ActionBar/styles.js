/**
* Created by jzobro 20170531
*/
import styled from 'styled-components';

export const Button = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    color: green;
  }
  &:disabled{
    cursor: default;
  }
`;

export const ActionBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

  // margin: 0 auto;
export const ControlPanel = styled.div`
  display: flex;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #999;
`;

export const ControlWrapper = styled.div`
  display: flex;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  margin-left: 8px;
  background-color: #666;
  &:first-child {
    margin-left: 0;
  }
`;

export const ActionButtonWrapper = styled(Button)`
  display: flex;
  height: 50px;
  min-width: 100px;
  background-color: #999;
  color: white;
  font-weight: 400;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const ActionIndicator = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  height: 40px;
  width: 8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #444;
`;

export const ActionText = styled.div`
  align-self: center;
  margin-left: 8px;
`;

export const BetWrapper = styled.div`
  display: flex;
`;

export const SliderWrapper = styled.div`
  align-self: center;
  width: 200px;
  height: 20px;
  margin-left: 18px;
  margin-right: 18px;
`;

export const AmountFlagWrapper = styled.div`
  display: inline-block;
  min-width: 60px;
  margin-left: 138px;
  padding: 5px;
  padding-left: 16px;
  padding-right: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #333;
  color: white;
`;
