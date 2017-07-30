import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, Field, reduxForm, SubmissionError, propTypes } from 'redux-form/immutable';

import FormField from '../../components/Form/FormField';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Container from '../../components/Container';
import { ErrorMessage } from '../../components/FormMessages';
import account from '../../services/account';
import { walletImport, login } from './actions';
import { setProgress } from '../App/actions';
import { setAuthState } from '../AccountProvider/actions';
import H1 from '../../components/H1';

import { ForgotField } from './styles';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validate = (values) => {
  const errors = {};
  if (!values.get('password')) {
    errors.password = 'Required';
  } else if (values.get('password').length < 8) {
    errors.password = 'Must be 8 characters or more.';
  }

  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!emailRegex.test(values.get('email'))) {
    errors.email = 'Invalid email address.';
  }
  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, dispatch) {
    return account.login(values.get('email')).catch((err) => {
      const errMsg = 'Login failed!';
      if (err === 404) {
        throw new SubmissionError({ confCode: 'Email unknown.', _error: errMsg });
      } else {
        throw new SubmissionError({ _error: `Login failed with error code ${err}` });
      }
    }).then((data) => {
      this.props.walletImport({
        json: data.wallet,
        password: values.get('password'),
      });

      // Login saga is called, we return the promise here,
      // so we can display form errors if any of the async ops fail.
      return login(values, dispatch).catch((workerErr) => {
        // If worker failed, ...
        throw new SubmissionError({ _error: `error, Login failed due to worker error: ${workerErr.payload.error}` });
      }).then((workerRsp) => {
        // If worker success, ...
        // ...tell account provider about login.
        this.props.setAuthState({
          privKey: workerRsp.payload.hexSeed,
          email: values.get('email'),
          loggedIn: true,
        });

        const { location } = this.props;
        let nextPath = '/lobby';

        if (location.state && location.state.nextPathname) {
          nextPath = location.state.nextPathname;
        } else if (location.query && location.query.redirect) {
          nextPath = decodeURIComponent(location.query.redirect);
        }

        browserHistory.push(nextPath); // Go to page that was requested
      });
    });
  }

  render() {
    const { error, handleSubmit, invalid, submitting } = this.props;
    return (
      <Container>
        <div>
          <H1>Log into your account!</H1>

          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <Field name="email" type="email" component={FormField} label="Email" autoFocus />
            <Field name="password" type="password" component={FormField} label="Password" />
            {error && <ErrorMessage error={error} />}
            <Button type="submit" size="large" disabled={submitting || invalid}>
              {(!submitting) ? 'Login' : 'Please wait ...'}
            </Button>
          </Form>

          <ForgotField>
            <Link to="reset">
              Forgot password
            </Link>
          </ForgotField>
        </div>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  ...propTypes,
  location: React.PropTypes.any,
  setProgress: React.PropTypes.func,
  walletImport: React.PropTypes.func,
  setAuthState: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    setProgress: (percent) => dispatch(setProgress(percent)),
    walletImport: (data) => dispatch(walletImport(data)),
    setAuthState: (data) => dispatch(setAuthState(data)),
  };
}

const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'login', validate, warn })(LoginPage));
