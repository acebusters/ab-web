import React from 'react';
import { Receipt } from 'poker-helper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, reduxForm } from 'redux-form/immutable';
import Web3 from 'web3';

import { getWeb3 } from '../../containers/AccountProvider/utils';
import SubmitButton from '../../components/SubmitButton';
import FormGroup from '../../components/Form/FormGroup';
import { CheckBox } from '../../components/Input';
import Label from '../../components/Label';
import H2 from '../../components/H2';

import { ABI_PROXY } from '../../app.config';
import { waitForTx } from '../../utils/waitForTx';

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
      hasWeb3: !!(window.web3 && window.web3.eth.accounts[0]),
      success: false,
    };

    // ToDo: "listen" to window.web3 and window.web3.eth.accounts[0] (with interval)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitting === false && this.props.submitting === true && !nextProps.invalid) {
      this.setState({ success: true });
    }
  }

  handleSubmit() {
    const { account } = this.props;
    const web3 = new Web3(window.web3.currentProvider);
    const proxyContract = web3.eth.contract(ABI_PROXY).at(account.proxy);

    // ToDo: extract LOCK_PRIV addr
    const receipt = new Receipt(proxyContract.address)
                      .unlock(window.web3.eth.accounts[0])
                      .sign('0x94890218f2b0d04296f30aeafd13655eba4c5bbf1770273276fee52cbe3f2cb4');

    return new Promise((resolve, reject) => {
      proxyContract.unlock(
        ...Receipt.parseToParams(receipt),
        { from: window.web3.eth.accounts[0] },
        (err, txHash) => {
          if (err) {
            reject(err);
          } else {
            waitForTx(getWeb3(), txHash).then(resolve, reject);
          }
        });
    });
  }

  render() {
    const { hasWeb3, success } = this.state;
    const { invalid, submitting, handleSubmit, onSuccessButtonClick } = this.props;

    return (
      <div>
        <H2>Upgrade your account</H2>

        {!hasWeb3 &&
          <div>
            <p>Your browser does not support smart contracts</p>
            <p>Please install MetaMask chrome extension (and login to metamask account), or ethereum browser (mist, parity ...).</p>
          </div>
        }

        <Form onSubmit={handleSubmit(this.handleSubmit)}>
          {hasWeb3 && !submitting && !success &&
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

          {submitting &&
            <p>Account upgrade tx pending...</p>
          }

          {success && <p>Account upgraded successful</p>}

          {!success &&
            <SubmitButton disabled={!hasWeb3 || invalid || submitting}>
              Upgrade
            </SubmitButton>
          }
          {success &&
            <SubmitButton type="button" onClick={onSuccessButtonClick}>
              Ok
            </SubmitButton>
          }
        </Form>
      </div>
    );
  }
}

UpgradeDialog.propTypes = {
  account: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSuccessButtonClick: PropTypes.func,
};

UpgradeDialog.defaultProps = {
};

export default connect()(
  reduxForm({
    form: 'upgrade',
    validate,
  })(UpgradeDialog)
);
