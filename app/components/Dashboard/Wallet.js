import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import {
  ETH_DECIMALS,
  NTZ_DECIMALS,
} from '../../utils/amountFormatter';

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
  handleNTZTransfer,
  handleETHTransfer,
  modalAdd,
  weiBalance,
}) => {
  const qrUrl = `ether:${account.proxy}`;
  return (
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
          <DBButton
            onClick={() => {
              modalAdd(
                <TransferDialog
                  title={<FormattedMessage {...messages.ntzTransferTitle} />}
                  handleTransfer={handleNTZTransfer}
                  maxAmount={babzBalance.div(NTZ_DECIMALS)}
                  amountUnit="NTZ"
                />
              );
            }}
            size="medium"
            icon="fa fa-money"
          >
            Nutz
          </DBButton>
          <DBButton
            onClick={() => {
              modalAdd(
                <TransferDialog
                  title={<FormattedMessage {...messages.ethTransferTitle} />}
                  handleTransfer={handleETHTransfer}
                  maxAmount={weiBalance.div(ETH_DECIMALS)}
                  amountUnit="ETH"
                />
              );
            }}
            size="medium"
            icon="fa fa-money"
          >
            Ether
          </DBButton>
        </SendContainer>
      </Section>

    </Pane>
  );
};
Wallet.propTypes = {
  account: PropTypes.object,
  babzBalance: PropTypes.object,
  handleNTZTransfer: PropTypes.func,
  handleETHTransfer: PropTypes.func,
  modalAdd: PropTypes.func,
  weiBalance: PropTypes.object,
};

export default Wallet;
