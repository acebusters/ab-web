import React from 'react';
// import PropTypes from 'prop-types';
import { Section } from '../../containers/Dashboard/styles';
import Input from '../Input';
import {
  Pane,
  ConfirmButton,
  TabButton as ModeButton,
  TabsWrapper as ModeWrapper,
  TabIcon as ModeIcon,
  TabTitle as ModeTitle,
} from './styles';

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
            <h3>QR Code</h3>
            <h3>ETH Address</h3>
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
// Wallet.propTypes = {
//   signerAddr: PropTypes.string,
// };

export default Wallet;
