import React from 'react';
import PropTypes from 'prop-types';

const Exchange = ({ signerAddr }) => (
  <div
    name="dashboard-exchange"
    style={{ margin: '80px 0 0 80px' }}
  >
    exchange: {signerAddr}
  </div>
);
Exchange.propTypes = {
  signerAddr: PropTypes.string,
};

export default Exchange;
