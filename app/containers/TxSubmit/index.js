import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectIsLocked, makeSelectProxyAddr, makeSelectCanSendTx } from '../AccountProvider/selectors';
import Alert from '../../components/Alert';
import SubmitButton from '../../components/SubmitButton';

import { ButtonContainer } from './styles';

class TxSubmit extends React.Component {
  static propTypes = {
    estimate: PropTypes.func.isRequired,
    estimateArgs: PropTypes.array,
    isLocked: PropTypes.bool,
    submitButtonLabel: PropTypes.any,
    cancelButtonLabel: PropTypes.any,
    onCancel: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    canSendTx: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      gas: null,
    };
    this.runEstimate(props);
  }

  componentWillReceiveProps(props) {
    if (
      props.estimate !== this.props.estimate ||
      props.invalid !== this.props.invalid ||
      props.canSendTx !== this.props.canSendTx ||
      props.estimateArgs !== this.props.estimateArgs
    ) {
      this.runEstimate(props);
    }
  }

  runEstimate(props) {
    const { isLocked, invalid, canSendTx, estimate, estimateArgs } = props;
    if (!isLocked && !invalid && canSendTx && estimateArgs) {
      estimate(...estimateArgs).then((gas) => this.setState({ gas }));
    }
  }

  renderAlert() {
    const { isLocked } = this.props;
    const { gas } = this.state;

    if (isLocked || !gas) {
      return null;
    }

    return (
      <Alert>
        Be sure to give at least <FormattedNumber value={gas} /> gas limit for your transaction.
        Otherwise&nbsp;transaction can fail
      </Alert>
    );
  }

  render() {
    const {
      submitButtonLabel,
      cancelButtonLabel,
      onCancel,
      submitting,
      canSendTx,
      invalid,
    } = this.props;
    const { gas } = this.state;

    return (
      <div>
        {!invalid && canSendTx && this.renderAlert()}

        <ButtonContainer>
          <SubmitButton
            disabled={!canSendTx || !gas || invalid}
            submitting={submitting}
          >
            {submitButtonLabel}
          </SubmitButton>
          {onCancel &&
            <SubmitButton type="button" onClick={onCancel}>
              {cancelButtonLabel}
            </SubmitButton>
          }
        </ButtonContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLocked: makeSelectIsLocked(),
  proxyAddr: makeSelectProxyAddr(),
  canSendTx: makeSelectCanSendTx(),
});

export default connect(mapStateToProps)(TxSubmit);
