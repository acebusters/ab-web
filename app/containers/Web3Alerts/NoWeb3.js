import React from 'react';
import A from '../../components/A';
import { Wrapper } from './styles';

const NoWeb3Alert = () => (
  <Wrapper theme="warning">
    <h2>YOUR BROWSER DOES NOT SUPPORT SMART CONTRACTS</h2>
    <p>
      You read from the Ethereum blockchain,
      but in order to interact with it from your browser,
      download an Ethereum enabled browser like <A href="https://github.com/ethereum/mist#installation" target="_blank">Mist</A>,
      <A href="https://www.parity.io/" target="_blank">Parity</A> or install the <A href="https://metamask.io/" target="_blank">Metamask Chrome Extension</A>.
    </p>
  </Wrapper>
);

export default NoWeb3Alert;

