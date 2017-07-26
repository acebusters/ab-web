import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import messages from '../../containers/Dashboard/messages';
import { ETH } from '../../containers/Dashboard/actions';

import NoWeb3Message from '../Web3Alerts/NoWeb3';
import UnsupportedNetworkMessage from '../Web3Alerts/UnsupportedNetwork';
import { ErrorMessage } from '../FormMessages';
import SubmitButton from '../SubmitButton';
import FormField from '../Form/FormField';
import AmountField from '../AmountField';
import Dropdown from '../Dropdown';
import Token from '../Dropdown/Token';
import Ethereum from '../Logo/Ethereum';
import Nutz from '../Logo/Nutz';

import {
  ControlWrapper,
  ControlDropdown,
} from './styles';

const tokens = [{
  node: Token,
  props: {
    name: <FormattedMessage {...messages.ethereum} />,
    amount: 0.13,
    unit: 'ETH',
    icon: <Ethereum height={30} width={30} />,
  },
}, {
  node: Token,
  props: {
    name: <FormattedMessage {...messages.nutz} />,
    amount: 1000,
    unit: 'NTZ',
    icon: <Nutz height={30} width={30} />,
  },
}];


class TokenDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
      maxAmount,
      invalid,
      hasWeb3,
      networkSupported,
      unit,
    } = this.props;
    const selected = unit === ETH ? 0 : 1;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <ControlWrapper>
            <ControlDropdown>
              <Dropdown
                options={tokens}
                selected={selected}
                {...this.props}
              />
            </ControlDropdown>
          </ControlWrapper>

          <AmountField
            name="amount"
            component={FormField}
            label="Amount"
            autoFocus
            maxAmount={maxAmount}
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
  handleSubmit: PropTypes.func,
  handleTransfer: PropTypes.func,
  error: PropTypes.any,
  unit: PropTypes.string,
};

export default TokenDialog;
