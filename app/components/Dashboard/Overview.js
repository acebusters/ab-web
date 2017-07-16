import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from './styles';

const Overview = ({ signerAddr }) => (
  <Pane name="dashboard-overview">
    overview: {signerAddr}
  </Pane>
);
Overview.propTypes = {
  signerAddr: PropTypes.string,
};

export default Overview;
