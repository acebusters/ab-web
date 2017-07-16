import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ signerAddr }) => (
  <div
    name="dashboard-overview"
    style={{ margin: '80px 0 0 80px' }}
  >
    overview: {signerAddr}
  </div>
);
Overview.propTypes = {
  signerAddr: PropTypes.string,
};

export default Overview;
