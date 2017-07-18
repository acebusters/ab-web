import React from 'react';
import styled from 'styled-components';

import { conf } from '../../app.config';

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
    <h2>Unsupported network</h2>
    <p>
      You can`t send transactions on this network. You must be on <strong>{conf().networkName}</strong>.
    </p>
  </Wrapper>
);

export default NoWeb3Message;

