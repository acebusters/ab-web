import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, SubmissionError, propTypes, change, formValueSelector } from 'redux-form/immutable';
import { browserHistory } from 'react-router';
import { Receipt, Type } from 'poker-helper';
import Pusher from 'pusher-js';

// components
import Container from '../../components/Container';
import FormField from '../../components/Form/FormField';
import Button from '../../components/Button';
import H1 from '../../components/H1';
import MouseEntropy from '../../components/MouseEntropy';
import { ErrorMessage } from '../../components/FormMessages';

import account from '../../services/account';
import * as storageService from '../../services/localStorage';
import { getWeb3 } from '../../containers/AccountProvider/utils';
import { waitForTx } from '../../utils/waitForTx';

import { walletExport, register } from './actions';


const validate = (values) => {
  const errors = {};
  if (!values.get('password')) {
    errors.password = 'Required';
  } else if (values.get('password').length < 8) {
    errors.password = 'Must be 8 characters or more.';
  }
  if (values.get('password') !== values.get('confirmedPassword')) {
    errors.confirmedPassword = 'Passwords dont match';
  }
  if (!values.get('entropy') || !values.get('entropy').length) {
    errors.entropy = 'Required';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  const pw = values.get('password');
  if (pw && pw.length < 12) {
    warnings.password = 'Better to use a strong passwords.';
  }
  return warnings;
};

function waitForAccountTx(signerAddr) {
  const pusher = new Pusher('d4832b88a2a81f296f53', { cluster: 'eu', encrypted: true });
  const channel = pusher.subscribe(signerAddr);
  return new Promise((resolve) => {
    channel.bind('update', (event) => {
      if (event.type === 'txHash') {
        resolve(waitForTx(getWeb3(), event.payload));
        channel.unbind('update');
      }
    });
  });
}

export class GeneratePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSaveEntropyClick = this.handleSaveEntropyClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEntropy = this.updateEntropy.bind(this);
    this.state = {
      secretCreated: false,
      entropySaved: false, // not actually saved, just a UI device
    };
  }

  handleSaveEntropyClick() {
    this.setState({ entropySaved: true });
  }

  handleSubmit(values, dispatch) {
    let confCode = storageService.getItem('ab-confCode');
    if (!confCode) {
      throw new SubmissionError({ _error: 'Error: session token lost.' });
    }
    confCode = decodeURIComponent(confCode);
    const receipt = Receipt.parse(confCode);
    let request;
    if (receipt.type === Type.CREATE_CONF) {
      request = account.addWallet;
    } else if (receipt.type === Type.RESET_CONF) {
      request = account.resetWallet;
    } else {
      throw new SubmissionError({ _error: `Error: unknown session type ${receipt.type}.` });
    }

    const entropy = JSON.parse(values.get('entropy'));
    // Strating the worker here.
    // Worker will encrypt seed with password in many rounds of crypt.
    this.props.walletExport({
      entropy,
      password: values.get('password'),
    });

    // Register saga is called, we return the promise here,
    // so we can display form errors if any of the async ops fail.
    return register(values, dispatch).catch((workerErr) => {
      // If worker failed, ...
      throw new SubmissionError({ _error: `error, Registration failed due to worker error: ${workerErr.payload.error}` });
    }).then((workerRsp) => {
      // If worker success, ...
      const wallet = JSON.parse(workerRsp.payload.json);
      wallet.address = `0x${wallet.address}`;
      delete wallet.id;
      // request(confCode, workerRsp.data.wallet)
      return request(confCode, wallet)
        .catch((err) => {
          // If store account failed...
          if (err === 409) {
            throw new SubmissionError({ email: 'Email taken.', _error: 'Registration failed!' });
          } else {
            throw new SubmissionError({ _error: `Registration failed with error code ${err}` });
          }
        })
        .then(() => waitForAccountTx(wallet.address))
        .catch((err) => {
          throw new SubmissionError({ _error: `Registration failed with message: ${err}` });
        })
        .then(() => browserHistory.push('/login'));
    });
  }

  updateEntropy(data) {
    this.setState({ secretCreated: true });
    this.props.onEntropyUpdated(JSON.stringify(data ? data.raw : null));
  }

  render() {
    const { error, handleSubmit, submitting, entropy, invalid } = this.props;
    const { entropySaved, secretCreated } = this.state;
    return (
      <Container>

        {!entropySaved ?
          <div>
            <H1>Create Randomness for Secret</H1>
            <Form onSubmit={handleSubmit(this.handleSaveEntropyClick)}>
              <MouseEntropy totalBits={768} width="100%" height="200px" onFinish={this.updateEntropy} sampleRate={0} />
              <Field name="entropy" type="hidden" component={FormField} label="" value={entropy} />
              {error && <ErrorMessage error={error} />}
              <Button
                type="submit"
                disabled={!secretCreated || entropySaved}
                size="large"
              >
                { (!entropySaved) ? 'Save Entropy' : 'Entropy Saved' }
              </Button>
            </Form>
          </div>
          :
          <div>
            <H1>Encrypt & Save Your Account!</H1>
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
              <Field name="password" type="password" component={FormField} label="Password" />
              <Field name="confirmedPassword" type="password" component={FormField} label="Confirm Password" />
              {error && <ErrorMessage error={error} />}
              <Button type="submit" disabled={submitting || invalid} size="large">
                { (!submitting) ? 'Encrypt and Save' : 'Please wait ...' }
              </Button>
            </Form>
          </div>
        }

        { submitting &&
          <div>
            <H1>Registering please wait ...</H1>
          </div>
        }
      </Container>
    );
  }
}

GeneratePage.propTypes = {
  ...propTypes,
  walletExport: PropTypes.func,
  input: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    walletExport: (data) => dispatch(walletExport(data)),
    onEntropyUpdated: (data) => dispatch(change('register', 'entropy', data)),
  };
}

// Which props do we want to inject, given the global state?
const selector = formValueSelector('register');
const mapStateToProps = (state) => ({
  entropy: selector(state, 'entropy'),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'register', validate, warn })(GeneratePage));
