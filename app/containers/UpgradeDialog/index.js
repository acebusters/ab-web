import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form/immutable';

import SubmitButton from '../../components/SubmitButton';
import FormGroup from '../../components/Form/FormGroup';
import { CheckBox } from '../../components/Input';
import Label from '../../components/Label';
import H2 from '../../components/H2';

const validate = (values) => {
  const errors = {};

  if (!values.get('accept')) {
    errors.accept = 'Required';
  }

  return errors;
};

/* eslint-disable react/prop-types */
const renderCheckBox = ({ input, label, type }) => (
  <FormGroup>
    <Label>
      <CheckBox {...input} placeholder={label} type={type} />
      {label}
    </Label>
  </FormGroup>
);
/* eslint-enable react/prop-types */

class UpgradeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasWeb3: !!window.web3,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    if (values.get('accept')) {
      console.log('unlock here');
    }
  }

  render() {
    const { hasWeb3 } = this.state;
    const { invalid, submitting, handleSubmit } = this.props;

    return (
      <div>
        <H2>Upgrade your account</H2>

        {!hasWeb3 &&
          <div>
            <p>Your browser does not support smart contracts</p>
          </div>
        }

        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          {hasWeb3 &&
            <div>
              <p>This will upgrade your account</p>
              <Field
                name="accept"
                type="checkbox"
                component={renderCheckBox}
                label="I understand that it will be my sole responsible to secure my account and balance"
              />
            </div>
          }

          <SubmitButton disabled={!hasWeb3 || invalid || submitting}>
            Upgrade
          </SubmitButton>
        </Form>
      </div>
    );
  }
}

UpgradeDialog.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

UpgradeDialog.defaultProps = {
};

export default connect()(
  reduxForm({
    form: 'upgrade',
    validate,
  })(UpgradeDialog)
);
