import styled from 'styled-components';
import { Button } from '../../utils/styleUtils';

import {
  baseColor,
  gray,
} from '../../variables';

export const Pane = styled.div`
  margin: 80px 0 0 80px;
`;

export const TabsWrapper = styled.ul`
  box-sizing: border-box;
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #333;
  font-weight: 400;
  border-bottom: 1px solid ${gray};
  min-height: 50px;
  border-radius: 0;
`;

export const Tab = styled.li`
  height: 100%;
  float: left;
  display: block;
  position: relative;
  display: inline;
  padding: 0 10px 15px 10px;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  line-height: 1.428571429;
  box-sizing: border-box;
`;

export const TabButton = styled(Button)`
  padding: 20px;
  border-bottom: ${(props) => props.active ? `2px solid ${baseColor}` : 'none'};
  &:hover {
    background-color: blue;
    color: white;
  }
  &:active {
    background-color: lightgreen;
    color: darkred;
  }
`;
