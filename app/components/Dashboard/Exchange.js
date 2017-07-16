import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from './styles';

const Exchange = ({ signerAddr }) => (
  <Pane name="dashboard-exchange" >
    exchange: {signerAddr}
  </Pane>
);
Exchange.propTypes = {
  signerAddr: PropTypes.string,
};

export default Exchange;
