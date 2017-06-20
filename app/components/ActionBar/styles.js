/**
* Created by jzobro 20170531
*/
import styled from 'styled-components';

import {
  curtainStickyWidth,
  curtainHalfWidth,
} from '../../variables';

const largeBoxShadow = '0 2px 4px 1px rgba(0,0,0,0.50)';
const medBoxShadow = '0 2px 4px 0px rgba(0,0,0,0.50)';
const Button = styled.button`
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
  &:disabled{
    cursor: default;
  }
`;

export const ActionBarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  opacity: ${(props) => props.active && !props.disabled ? 1 : 0.3};

  transition: opacity 0.5s ease;

  @media (min-width: ${curtainStickyWidth}) {
    left: calc(50% + ${curtainHalfWidth});
  }
`;

export const ControlPanel = styled.div`
  display: flex;
  padding-top: 6px;
  padding-left: 7px;
  padding-right: 7px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #7A7A7A;
  background-image: linear-gradient(0deg, #383838 0%, #7A7A7A 100%);
  box-shadow: ${largeBoxShadow};
`;

export const ControlWrapper = styled.div`
  display: flex;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  padding-top: 3px;
  padding-left: 3px;
  padding-right: 3px;
  background-color: none;
  box-shadow: inset 0 1px 3px 1px rgba(0,0,0,0.50);
`;

export const ActionButtonWrapper = styled(Button)`
  display: flex;
  height: 40px;
  ${(props) =>
    props.type === 'BET-SET' ||
    props.type === 'RAISE-SET' ||
    props.type === 'BLANK' ?
    'min-width: 88px;'
  :
    'min-width: 94px;'
  };
  margin-left: 4px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: #7C7C7C;
  background-image: linear-gradient(0deg, #383838 0%, #7C7C7C 100%);
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.50);
  color: white;
  font-weight: 400;
  &:first-child {
    margin-left: 0;
    border-top-left-radius: 9px;
  }
  &:nth-child(3) {
    border-top-right-radius: 9px;
  }
  &:active {
    background-color: #666;
    color: #DDD;
  }
  &:disabled {
    background-color: #777;
    color: #DDD;
  }
`;

export const ActionIndicator = styled.div`
  margin-left: 8px;
  margin-top: 6px;
  height: 34px;
  width: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${(props) => props.active ? 'yellow' : 'none'};
  box-shadow: inset 0 1px 3px 0px rgba(0,0,0,0.50);
`;

export const ActionText = styled.div`
  height: 100%;
  ${(props) =>
    props.type === 'BET-SET' ||
    props.type === 'RAISE-SET' ||
    props.type === 'BLANK' ?
    `width: 100%;
     margin-left: 0;
     text-align: center;`
  :
    `margin-left: 12px;
     text-align: left;`
  }
  margin-bottom: 2px;
  align-self: center;
  color: #CACACA;
  font-weight: 600;
  font-size: 12px;
`;

export const SliderWrapper = styled.div`
  align-self: center;
  width: 200px;
  height: 20px;
  margin-left: 24px;
  margin-right: 24px;
`;

export const FlagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  opacity: ${(props) => props.active ? 1 : 0};
`;

export const FlagButtonWrapper = styled(Button)`
  margin-left: 4px;
  padding: 5px;
  padding-left: 18px;
  padding-right: 18px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: solid 2px #515151;
  background-color: #7B7B7B;
  color: #C1BFBF;
  font-weight: 600;
  font-size: 12px;
  box-shadow: ${largeBoxShadow};
`;

const FlagShared = styled.div`
  padding: 6px 10px;
  padding-bottom: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #BCBCBC;
  box-shadow: ${medBoxShadow};
  color: #555;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

export const FlagBet = styled(FlagShared)`
  margin-right: 60px;
  width: 92px;
`;

export const FlagCall = styled(FlagShared)`
  ${(props) => {
    if (props.sliderOpen) {
      return `
        margin-right: 18px;
      `;
    }
    return `
      margin: 0 auto;
    `;
  }};
  min-width: 80px;
`;
