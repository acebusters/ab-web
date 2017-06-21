/**
* Created by jzobro 20170531
*/
import styled, { keyframes } from 'styled-components';

import {
  curtainStickyWidth,
  curtainHalfWidth,
} from '../../variables';

const active = '#35c5e3'; // electric blue
const largeBoxShadow = '0 2px 4px 1px rgba(0,0,0,0.50)';
const medBoxShadow = '0 2px 4px 0px rgba(0,0,0,0.50)';
const Button = styled.button`
  padding: 0;
  margin: 0;
  border: none;
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

  transition: opacity 0.3s ease-out;

  @media (min-width: ${curtainStickyWidth}) {
    left: calc(50% + ${curtainHalfWidth});
  }
`;

export const ControlPanel = styled.div`
  z-index: 3;
  min-height: 49px;
  align-self: center;
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

const easeSliderIn = keyframes`
  from { width: 290px; }
  to { width: 544px; }
`;

const easeSliderOut = keyframes`
  from { width: 544px; }
  to { width: 290px; }
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
  ${(props) => props.sliderOpen ?
    `animation: ${easeSliderIn} 0.5s ease-in-out;`
    :
    `animation: ${easeSliderOut} 0.5s ease-in-out;`
  }
`;

export const ActionButtonWrapper = styled(Button)`
  display: flex;
  height: 40px;
  margin-left: 4px;
  min-width: 88px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: #7C7C7C;
  background-image: linear-gradient(0deg, #383838 0%, #7C7C7C 100%);
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.50);
  font-weight: 400;
  ${(props) =>
    props.type === 'BET-SET' ||
    props.type === 'RAISE-SET' ||
    props.type === 'BLANK' ?
    'min-width: 88px;'
  :
    'min-width: 94px;'
  };
  color: #CACACA;
  &:first-child {
    margin-left: 0;
    border-top-left-radius: 9px;
  }
  &:nth-child(3) {
    border-top-right-radius: 9px;
  }
  &:hover {
    background-color: #383838;
    background-image: linear-gradient(0deg, #666 0%, #585858 72%, #7C7C7C 100%);
  }
  &:active {
    background-color: #7C7C7C;
    background-image: linear-gradient(0deg, #7C7C7C 0%, #585858 72%, #666 100%);
    color: ${active};
  }
  &:disabled {
    background-color: #777;
    color: #DDD;
  }
`;

export const ActionIndicator = styled.div`
  ${(props) =>
    props.type === 'BLANK' ||
    props.type === 'BET-SET' ||
    props.type === 'RAISE-SET' ?
    'display: none;'
    :
    'display: block;'
  };
  margin-left: 8px;
  margin-top: 6px;
  height: 34px;
  width: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${(props) => props.active ? active : 'none'};
  box-shadow: inset 0 1px 3px 0px rgba(0,0,0,0.50);
`;

export const ActionText = styled.div`
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
  font-weight: 600;
  font-size: 15px;
`;

export const SliderWrapper = styled.div`
  align-self: center;
  width: 200px;
  height: 20px;
  margin-left: 24px;
  margin-right: 24px;
`;

export const SliderHandle = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 40px;
  margin-left: -12px;
  margin-top: -12px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
  background-color: #7C7C7C;
  background-image: linear-gradient(0deg, #383838 0%, #7C7C7C 100%);
  boxShadow: 0 1px 2px 0 rgba(0,0,0,0.50);
  &:hover {
    background-color: #383838;
    background-image: linear-gradient(0deg, #666 0%, #585858 72%, #7C7C7C 100%);
  }
  &:active {
    background-color: #7C7C7C;
    background-image: linear-gradient(0deg, #7C7C7C 0%, #585858 72%, #666 100%);
  }
`;

export const SliderDot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.active ? active : 'none'};
  box-shadow: inset 0 1px 3px 1px rgba(0,0,0,0.50);
`;

export const FlagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  opacity: ${(props) => props.active ? 1 : 0};
`;

export const FlagButtonWrapper = styled(Button)`
  height: 30px;
  transform: translateY(${(props) => !props.sliderOpen ? '32px' : '0'});

  opacity: 0.5;
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
  &:hover {
    cursor: default;
  }
  transition: 0.5s ease;
`;

const FlagShared = styled.div`
  min-height: 30px;
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
  min-width: 80px;
  transition: 0.5s ease;
  align-self: center;
`;

export const FlagBet = styled(FlagShared)`
  z-index: 1;
  ${(props) => props.sliderOpen ?
    `transform: translate(-26px, 30px);
    transition-delay: 0.3s;
    ` : `
    transform: translate(0px, 60px);`
  }
`;

export const FlagCall = styled(FlagShared)`
  z-index: 2;
  ${(props) => props.sliderOpen ?
    `margin-right: 18px;
    display: ${props.hide ? 'none' : 'block'};
    transform: translate(-116px, 60px);
    ` : `
    transform: translateY(${props.hide ? '90px' : '60px'});
    `
  };
`;
