import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import { Section, Address } from '../../containers/Dashboard/styles';
import Alert from '../Alert';
import WithLoading from '../WithLoading';
import Input from '../Input';
import {
  Pane,
  ConfirmButton,
  TabButton as ModeButton,
  TabsWrapper as ModeWrapper,
  TabIcon as ModeIcon,
  TabTitle as ModeTitle,
} from './styles';
import messages from '../../containers/Dashboard/messages';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.toggleWallet = this.toggleWallet.bind(this);
    this.state = {
      mode: 'send',
      wallet: 'ethereum',
    };
  }

  toggleMode() {
    const newState = this.state.mode === 'receive' ? 'send' : 'receive';
    this.setState({ mode: newState });
  }

  toggleWallet() {
    const newState = this.state.wallet === 'ethereum' ? 'nutz' : 'ethereum';
    this.setState({ wallet: newState, mode: 'send' });
  }

  render() {
    const qrUrl = `ether:${this.props.account.proxy}`;
    return (
      <Pane name="dashboard-wallet">
        <ModeWrapper name="wallet-select">
          <ModeButton
            disabled={this.state.wallet === 'ethereum'}
            onClick={this.toggleWallet}
          >
            <ModeTitle>Ethereum</ModeTitle>
          </ModeButton>
          <ModeButton
            disabled={this.state.wallet === 'nutz'}
            onClick={this.toggleWallet}
          >
            <ModeTitle>Nutz</ModeTitle>
          </ModeButton>
        </ModeWrapper>

        <ModeWrapper name="mode-select">
          <ModeButton
            disabled={this.state.mode === 'receive'}
            onClick={this.toggleMode}
          >
            <ModeIcon className="fa fa-inbox" />
            <ModeTitle>Receive</ModeTitle>
          </ModeButton>
          <ModeButton
            disabled={this.state.mode === 'send'}
            onClick={this.toggleMode}
          >
            <ModeIcon className="fa fa-send" />
            <ModeTitle>Send</ModeTitle>
          </ModeButton>
        </ModeWrapper>

        {this.state.mode === 'send' ?
          <Section name="wallet-send">
            <h3>From </h3>
            <div style={{ height: 50, width: '100%', margin: 8 }}>
                0x0ddkjsh32ijfioj3i9gh0jhgiflsfjdlsjo23joihhgoikkxnlkdl
            </div>
            <h3>To (Ethereum Address)</h3>
            <Input />
            <h3>Amount</h3>
            <Input />
            <ConfirmButton>
              <ModeIcon className="fa fa-check-square-o" />
              <ModeTitle>Confirm</ModeTitle>
            </ConfirmButton>
          </Section>
        :
          <Section name="wallet-receive">
            <h3>Your Address</h3>
            <WithLoading
              isLoading={!this.props.account.proxy || this.props.account.proxy === '0x'}
              loadingSize="40px"
              styles={{ layout: { transform: 'translateY(-50%)', left: 0 } }}
            >
              <Address>{this.props.account.proxy}</Address>
              <QRCode value={qrUrl} size={120} />

              <Alert theme="danger">
                <FormattedMessage {...messages.ethAlert} />
              </Alert>
            </WithLoading>
            <ConfirmButton>
              <ModeIcon className="fa fa-copy" />
              <ModeTitle>Copy to Clipboard</ModeTitle>
            </ConfirmButton>
          </Section>
        }
      </Pane>
    );
  }
}
Wallet.propTypes = {
  account: PropTypes.object,
};

export default Wallet;
