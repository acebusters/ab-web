import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { createStructuredSelector } from 'reselect';
import SubmitButton from '../../components/SubmitButton';
import H2 from '../../components/H2';
import NoWeb3Message from '../../components/NoWeb3Message';

import { makeSbSelector } from '../Table/selectors';
import { makeSelectProxyAddr, makeSelectInjectedAccount } from '../AccountProvider/selectors';
import { formatNtz } from '../../utils/amountFormatter';

export class JoinDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      amount: props.sb * 40,
    };
    this.updateAmount = this.updateAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateAmount(value) {
    const amount = value;
    this.setState({ amount });
  }

  handleSubmit() {
    this.props.handleJoin(this.props.pos, this.state.amount);
  }

  render() {
    const { sb, injected, balance, modalDismiss } = this.props;

    const min = sb * 40;
    const tableMax = sb * 200;
    const max = (balance < tableMax) ? balance - (balance % sb) : tableMax;
    if (balance < min) {
      return (
        <div style={{ minWidth: '20em' }}>
          <H2>Sorry!</H2>
          <p>Your balance is not sufficient to join this table!</p>
          <SubmitButton onClick={modalDismiss}>OK</SubmitButton>
        </div>
      );
    }
    return (
      <div style={{ minWidth: '20em' }}>
        <Slider
          data-orientation="vertical"
          value={this.state.amount}
          tooltip={false}
          min={min}
          max={max}
          step={sb}
          onChange={this.updateAmount}
        />
        <div>Max: {formatNtz(max)} NTZ</div>
        <div>{ (this.state) ? formatNtz(this.state.amount) : formatNtz(min) } NTZ</div>

        {!injected && <NoWeb3Message />}

        <SubmitButton onClick={this.handleSubmit} disabled={!injected}>
          Join
        </SubmitButton>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  sb: makeSbSelector(),
  proxyAddr: makeSelectProxyAddr(),
  injected: makeSelectInjectedAccount(),
});

JoinDialog.propTypes = {
  handleJoin: PropTypes.func,
  modalDismiss: PropTypes.func,
  injected: PropTypes.string,
  pos: PropTypes.any,
  sb: PropTypes.number,
  balance: React.PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinDialog);
