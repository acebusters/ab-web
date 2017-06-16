import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import AmountField from '../../components/AmountField';
import H2 from '../../components/H2';
import FormGroup from '../../components/Form/FormGroup';
import { ErrorMessage } from '../../components/FormMessages';

import messages from './messages';

const validate = (values) => {
  const errors = {};
  if (!values.get('amount')) {
    errors.amount = 'Required';
  }

  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

/* eslint-disable react/prop-types */
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <FormGroup>
    <Label htmlFor={input.name}>{label}</Label>
    <Input {...input} type={type} />
    {touched && ((error && <ErrorMessage error={error}></ErrorMessage>) || (warning && <ErrorMessage error={warning}></ErrorMessage>))}
  </FormGroup>
);
/* eslint-enable react/prop-types */

class PurchaseDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const amount = Number(values.get('amount', '').replace(',', '.'));
    this.props.handleTransfer(values.get('address'), amount);
  }

  render() {
    const { error, handleSubmit, submitting, amountUnit, maxAmount } = this.props;

    return (
      <div>
        <H2><FormattedMessage {...messages.header} /></H2>
        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <AmountField
            name="amount"
            component={renderField}
            label={`NTZ amount for purchase (${amountUnit})`}
            maxAmount={maxAmount}
          />
          {error && <strong>{error}</strong>}
          <div>
            <Button type="submit" disabled={submitting}>Submit</Button>
          </div>
        </Form>
      </div>
    );
  }
}

PurchaseDialog.propTypes = {
  submitting: PropTypes.bool,
  maxAmount: PropTypes.object, // BigNumber
  amountUnit: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleTransfer: PropTypes.func,
  error: PropTypes.any,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'purchase',
    validate,
    warn,
  })(PurchaseDialog)
);
