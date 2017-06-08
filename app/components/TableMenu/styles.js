/**
* Created by jzobro 20170602
*/
import styled from 'styled-components';

const menuColor = '#ebe8e8';
const menuClose = 'linear-gradient(0deg, #606060 0%, #808080 100%)';
const menuOpen = 'linear-gradient(0deg, #383838 0%, #717171 100%)';
const menuActiveBoxShadow = 'inset 2px 1px 5px 2px rgba(0,0,0,0.50)';

export const Button = styled.button`
  padding: 0;
  margin: 0;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    box-shadow: ${menuActiveBoxShadow};
  }
  &:active {
    box-shadow: ${menuActiveBoxShadow};
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  color: white;
  width: 100%;
`;

// Logo
export const LogoWrapper = styled.div`
  display: flex;
  width: 128px;
  height: 46px;
  border: 1px dashed red;
`;

export const Logo = styled.div`
  color: inherit;
`;

// table-menu
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 148px;
  margin-left: auto;
  background: ${(props) => props.open ? menuOpen : menuClose};
  border-bottom-left-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.31);
`;

// header-item
export const MenuHeader = styled(Button)`
  display: flex;
  align-items: center;
  height: 46px;
  padding-left: 14px;
`;

export const Identicon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-image: url(${(props) => props.bgImg});
  background-size: 24px 24px;
`;

export const NickName = styled.span`
  min-width: 40px;
  padding-left: 6px;
  font-size: 14px;
  font-weight: normal;
  color: ${menuColor};
`;

export const Hamburger = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  padding-right: 8px;
  min-width: 20px;
  min-height: 20px;
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

// menu item
export const ItemWrapper = styled(Button)`
  display: flex;
  height: 40px;
  margin-left: 8px;
  padding-left: 12px;
  color: ${menuColor};
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  &:last-child {
    height: 40px;
    margin-bottom: 10px;
  }
`;

export const ItemIcon = styled.i`
  &:before {
    font-size: 16px;
  }
`;

export const ItemTitle = styled.span`
  padding-left: 10px;
  font-size: 14px;
`;
