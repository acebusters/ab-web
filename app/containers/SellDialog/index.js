import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import Button from '../../components/Button';
import FormField from '../../components/Form/FormField';
import AmountField from '../../components/AmountField';
import H2 from '../../components/H2';

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

class SellDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.handleSell(values.get('amount'));
  }

  render() {
    const { handleSubmit, submitting, maxAmount } = this.props;

    return (
      <div>
        <H2><FormattedMessage {...messages.header} /></H2>

        Floor price → amount eth (should be live)

        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          <AmountField
            name="amount"
            component={FormField}
            label="Amount (NTZ)"
            maxAmount={maxAmount}
          />

          <div>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

SellDialog.propTypes = {
  submitting: PropTypes.bool,
  maxAmount: PropTypes.object, // BigNumber
  handleSubmit: PropTypes.func,
  handleSell: PropTypes.func,
  // error: PropTypes.any,
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
  })(SellDialog)
);