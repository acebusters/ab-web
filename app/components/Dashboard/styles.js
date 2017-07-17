import styled from 'styled-components';
import { Button } from '../../utils/styleUtils';

import {
  baseColor,
  gray,
} from '../../variables';

export const Pane = styled.div`
  display: block;
  margin: 0;
  padding-top: 20px;
`;

// Tabs
export const TabsWrapper = styled.ul`
  display: flex;
  min-height: 32px;
  margin: 0;
  padding: 0;
  width: 100%;
  color: #333;
  border-bottom: 1px solid ${gray};
  border-radius: 0;
`;

export const Tab = styled.li`
  padding: 0;
  margin: 0;
  list-style-type: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.428571429;
`;

export const TabButton = styled(Button)`
  padding: 10px;
  margin: 0;
  color: ${gray};
  &:hover {
    background-color: ${gray};
    color: white;
    border-bottom: 2px solid ${gray};
  }
  &:active {
    border-bottom: 2px solid ${baseColor};
  }
  &:disabled {
    background-color: white;
    border-bottom: 2px solid ${baseColor};
    color: black;
  }
`;
