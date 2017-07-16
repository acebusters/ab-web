import React from 'react';
import PropTypes from 'prop-types';

const Wallet = ({ signerAddr }) => (
  <div
    name="dashboard-wallet"
    style={{ margin: '80px 0 0 80px' }}
  >
    wallet: {signerAddr}
  </div>
);
Wallet.propTypes = {
  signerAddr: PropTypes.string,
};

export default Wallet;
