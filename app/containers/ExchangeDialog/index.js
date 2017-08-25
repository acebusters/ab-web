import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import ExchangeDialog from '../../components/ExchangeDialog';
import messages from './messages';

import {
  makeSelectHasWeb3,
  makeSelectNetworkSupported,
} from '../AccountProvider/selectors';

const validate = (values, props) => {
  const errors = {};
  const amount = parseFloat(values.get('amount'));
  const { maxAmount, minAmount = 0 } = props;
  if (!amount) {
    errors.amount = <FormattedMessage {...messages.amountRequired} />;
  }
  if (amount <= minAmount) {
    errors.amount = <FormattedMessage {...messages.amountTooLow} values={{ minAmount }} />;
  }
  if (maxAmount && maxAmount.lt(amount)) {
    errors.amount = <FormattedMessage {...messages.amountTooHigh} values={{ maxAmount }} />;
  }

  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

const valueSelector = formValueSelector('exchange');

const mapStateToProps = (state) => ({
  messages,
  amount: valueSelector(state, 'amount'),
  hasWeb3: makeSelectHasWeb3()(state),
  networkSupported: makeSelectNetworkSupported()(state),
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'exchange',
    validate,
    warn,
  })(ExchangeDialog)
);
