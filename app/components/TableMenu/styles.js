/**
* Created by jzobro 20170602
*/
import styled from 'styled-components';

export const Button = styled.button`
  padding: 0;
  margin: 0;
  &:hover {
    background: blue;
  }
  &:active {
    background: green;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: cornflowerblue;
  color: white;
  width: 100%;
`;

// Logo
export const LogoWrapper = styled.div`
  display: flex;
  width: 128px;
  height: 46px;
  background-color: lightgreen;
`;

export const Logo = styled.div`
  background-color: lightgreen;
`;

// header
export const MenuHeader = styled(Button)`
  display: flex;
  align-items: center;
  margin-left: auto;
  min-width: 128px;
  padding-left: 14px;
  border-bottom-left-radius: 8px;
  background: linear-gradient(0deg, #606060 0%, #808080 100%);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.31);
`;

export const Identicon = styled.span`
  min-width: 24px;
  min-height: 24px;
  border: 1px solid red;
  border-radius: 50%;
`;

export const NickName = styled.span`
  min-width: 40px;
  padding-left: 6px;
  border: 1px solid red;
  font-size: 14px;
  font-weight: normal;
  color: #EBE8E8;
`;

export const Hamburger = styled.span`
  margin-left: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  min-width: 20px;
  min-height: 20px;
  border: 1px solid red;
`;

export const Patty = styled.div`
  width: 20px;
  height: 4px;
  margin-bottom: 3px;
  background-color: #5b5a5a;
  box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.41);
  border-radius: 1px;
  &:last-child {
    margin-bottom: 0;
  }
`;
