import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable';

import { validateFloat } from '../../utils/inputValidators';
import ExchangeDialog from '../../components/ExchangeDialog';
import messages from './messages';

import {
  makeSelectHasWeb3,
  makeSelectNetworkSupported,
} from '../AccountProvider/selectors';

const validate = (values, props) => {
  const errors = {};
  const { maxAmount, minAmount = 0 } = props;
  const amount = values.get('amount');

  validateFloat(messages, errors, amount, minAmount, maxAmount);

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
