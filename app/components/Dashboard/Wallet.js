import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import { DBButton } from '../../containers/Dashboard/styles';
import messages from '../../containers/Dashboard/messages';
import TransferDialog from '../../containers/TransferDialog';

import H2 from '../H2';
import Alert from '../Alert';
import WithLoading from '../WithLoading';

import {
  Address,
  Pane,
  Section,
  SendContainer,
  TabIcon as ModeIcon,
  WalletContainer,
} from './styles';

const Wallet = ({
  account,
  babzBalance,
  ethBalance,
  nutzBalance,
  handleNTZTransfer,
  handleETHTransfer,
  modalAdd,
  qrUrl,
  weiBalance,
}) => (
  <Pane name="dashboard-wallet">
    <Section name="wallet-receive">
      <H2><ModeIcon className="fa fa-inbox" />Receive</H2>
      <WithLoading
        isLoading={!account.proxy || account.proxy === '0x'}
        loadingSize="40px"
        styles={{ layout: { transform: 'translateY(-50%)', left: 0 } }}
      >
        <WalletContainer>
          <QRCode value={qrUrl} size={180} />
          <Address>{account.proxy}</Address>

          <Alert theme="danger">
            <FormattedMessage {...messages.ethAlert} />
          </Alert>
        </WalletContainer>
      </WithLoading>
    </Section>

    <Section name="wallet-send">
      <H2><ModeIcon className="fa fa-send" />Transfer</H2>
      <SendContainer>
        {babzBalance &&
          <DBButton
            onClick={() => modalAdd(
              <TransferDialog
                title={<FormattedMessage {...messages.ntzTransferTitle} />}
                handleTransfer={handleNTZTransfer}
                maxAmount={nutzBalance}
                amountUnit="NTZ"
              />
            )}
            size="medium"
          >
            Nutz
          </DBButton>
        }
        {weiBalance &&
          <DBButton
            onClick={() => modalAdd(
              <TransferDialog
                title={<FormattedMessage {...messages.ethTransferTitle} />}
                handleTransfer={handleETHTransfer}
                maxAmount={ethBalance}
                amountUnit="ETH"
              />
            )}
            size="medium"
          >
            Ether
          </DBButton>
        }
      </SendContainer>
    </Section>

  </Pane>
);
Wallet.propTypes = {
  account: PropTypes.object,
  babzBalance: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  handleNTZTransfer: PropTypes.func,
  handleETHTransfer: PropTypes.func,
  modalAdd: PropTypes.func,
  qrUrl: PropTypes.string,
  weiBalance: PropTypes.object,
};

export default Wallet;
