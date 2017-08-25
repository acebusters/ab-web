import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form/immutable';
import BigNumber from 'bignumber.js';

import NoWeb3Message from '../Web3Alerts/NoWeb3';
import UnsupportedNetworkMessage from '../Web3Alerts/UnsupportedNetwork';
import { ErrorMessage } from '../FormMessages';
import SubmitButton from '../SubmitButton';
import FormField from '../Form/FormField';
import TokenAmountField from '../Form/TokenAmountField';

class TokenDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    return this.props.handleTransfer(
      values.get('amount'),
      values.get('address'),
    ).then(() => this.props.reset());
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      maxAmount,
      minAmount,
      invalid,
      hasWeb3,
      networkSupported,
      normalizer,
    } = this.props;
    return (
      <div style={{ maxWidth: 480 }}>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            normalize={normalizer}
            name="amount"
            component={TokenAmountField}
            label="Amount"
            autoFocus
            maxAmount={maxAmount}
            minAmount={minAmount}
            modalAdd={this.props.modalAdd}
            modalDismiss={this.props.modalDismiss}
            amountUnit={this.props.amountUnit}
            setAmountUnit={this.props.setAmountUnit}
            reset={this.props.reset}
            placeholder="0.00"
          />

          <Field
            name="address"
            component={FormField}
            type="text"
            label="Ethereum address"
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {!hasWeb3 && <NoWeb3Message />}
          {hasWeb3 && !networkSupported && <UnsupportedNetworkMessage />}

          <SubmitButton
            type="submit"
            disabled={invalid || !hasWeb3 || !networkSupported}
            submitting={submitting}
          >
            Submit
          </SubmitButton>
        </Form>
      </div>
    );
  }
}
TokenDialog.propTypes = {
  hasWeb3: PropTypes.bool,
  networkSupported: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  maxAmount: PropTypes.object, // BigNumber
  minAmount: PropTypes.object, // BigNumber
  handleSubmit: PropTypes.func,
  handleTransfer: PropTypes.func,
  error: PropTypes.any,
  modalAdd: PropTypes.func,
  modalDismiss: PropTypes.func,
  amountUnit: PropTypes.string,
  setAmountUnit: PropTypes.func,
  reset: PropTypes.func,
  normalizer: PropTypes.func,
};
TokenDialog.defaultProps = {
  minAmount: new BigNumber(0),
};

export default TokenDialog;
