import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from './styles';

const Wallet = ({ signerAddr }) => (
  <Pane name="dashboard-wallet">
    wallet: {signerAddr}
  </Pane>
);
Wallet.propTypes = {
  signerAddr: PropTypes.string,
};

export default Wallet;
