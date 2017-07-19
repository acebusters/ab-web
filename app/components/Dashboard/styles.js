import styled from 'styled-components';
import { Button } from '../../utils/styleUtils';

import {
  baseColor,
  gray,
} from '../../variables';

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-top: 20px;
`;

export const Section = styled.div`
  padding-bottom: 20px;

  & + & {
    border-top: 1px solid #ccc;
  }
`;

// Wallet
export const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Address = styled.p`
  overflow-y: auto;
  padding: 10px 0;
  margin: 10px -30px 0 0;
`;


// Exchange
export const ExchangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Tabs
export const TabsWrapper = styled.ul`
  display: flex;
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
  font-size: 1em;
  line-height: 1.428571429;
`;

export const TabButton = styled(Button)`
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 0.7em 1.2em;
  margin: 0;
  color: ${gray};
  border-bottom: 2px solid transparent;
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

export const TabIcon = styled.i`
  padding-right: .6em;
  &:before {
    font-size: 1.3em;
  }
`;

export const TabTitle = styled.span`
  padding-bottom: 4px;
  font-weight: 400;
`;

// Wallet
export const ConfirmButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  padding: 10px;
  min-width: 260px;
  border: 1px solid ${gray};
  border-radius: 4px;
  &:hover {
    background-color: ${gray};
  }
  &:active {
    background-color: ${gray};
    color: white;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${gray};
  border-radius: 4px;
`;
