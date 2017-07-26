import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form/immutable';

import NoWeb3Message from '../../components/Web3Alerts/NoWeb3';
import UnsupportedNetworkMessage from '../../components/Web3Alerts/UnsupportedNetwork';
import { ErrorMessage } from '../../components/FormMessages';
import SubmitButton from '../../components/SubmitButton';
import FormField from '../../components/Form/FormField';
import AmountField from '../../components/AmountField';
import H2 from '../../components/H2';

class TransferDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    return this.props.handleTransfer(
      values.get('amount'),
      values.get('address'),
    );
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      amountUnit,
      maxAmount,
      hideAddress,
      title,
      description,
      invalid,
      hasWeb3,
      networkSupported,
    } = this.props;

    return (
      <div>
        {title && <H2>{title}</H2>}
        {description && <p>{description}</p>}
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <AmountField
            name="amount"
            component={FormField}
            label={`Amount (${amountUnit})`}
            autoFocus
            maxAmount={maxAmount}
          />

          {!hideAddress &&
            <Field
              name="address"
              component={FormField}
              type="text"
              label="Ethereum address"
            />
          }

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
TransferDialog.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  hasWeb3: PropTypes.bool,
  networkSupported: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  hideAddress: PropTypes.bool,
  maxAmount: PropTypes.object, // BigNumber
  amountUnit: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleTransfer: PropTypes.func,
  error: PropTypes.any,
};

TransferDialog.defaultProps = {
  hideAddress: false,
};

export default TransferDialog;
