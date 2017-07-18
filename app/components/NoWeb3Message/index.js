import React from 'react';
import styled from 'styled-components';

import Alert from '../../components/Alert';

const Wrapper = styled(Alert)`
  max-width: 700px;
  padding: 15px;
  margin: 20px 0;

  h2 {
    font-size: 16px;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const NoWeb3Message = () => (
  <Wrapper theme="warning">
    <h2>YOUR BROWSER DOES NOT SUPPORT SMART CONTRACTS</h2>
    <p>
      You read from the Ethereum blockchain,
      but in order to interact with it from your browser,
      download an Ethereum enabled browser like Mist,
      Parity or install the Metamask Chrome Extension.
    </p>
  </Wrapper>
);

export default NoWeb3Message;

