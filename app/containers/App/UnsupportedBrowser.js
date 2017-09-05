import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import H2 from '../../components/H2';
import SubmitButton from '../../components/SubmitButton';

import { modalDismiss } from './actions';

function UnsupportedBrowser({ onClose }) {
  return (
    <div>
      <H2>Your browser is not supported</H2>
      <p>Most features should work, but you will be not able to upgrade and secure your account.</p>
      <p>Currently we are support: Chrome, Opera, Edge, Firefox, Mist.</p>
      <SubmitButton onClick={onClose}>
        Got it
      </SubmitButton>
    </div>
  );
}

UnsupportedBrowser.propTypes = {
  onClose: PropTypes.func,
};

export default connect(null, {
  onClose: modalDismiss,
})(UnsupportedBrowser);
