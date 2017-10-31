import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import ethUtil from 'ethereumjs-util';
import { FormattedMessage } from 'react-intl';
import H2 from 'components/H2';
import { Address } from 'components/Dashboard/styles';
import messages from 'containers/Dashboard/messages';
import SubmitButton from 'components/SubmitButton';
import Alert from '../Alert';
import WithLoading from '../WithLoading';
import { MAIN_NET_GENESIS_BLOCK, conf } from '../../app.config';

const DepositDialog = ({ account }) => {
  const qrUrl = `ether:${account.proxy}`;
  return (
    <div>
      <H2>Deposit Info</H2>
      <WithLoading
        isLoading={!account.proxy || account.proxy === '0x'}
        loadingSize="40px"
        styles={{
          outer: { margin: 'auto' },
        }}
      >
        <QRCode value={qrUrl} size={100} />
        <Alert style={{ margin: 'auto' }} theme="success">
          <Address style={{ width: 180 }}>
            {ethUtil.toChecksumAddress(account.proxy)}
          </Address>
        </Alert>
      </WithLoading>

      {conf().firstBlockHash !== MAIN_NET_GENESIS_BLOCK && (
        <Alert theme="danger">
          <FormattedMessage {...messages.ethAlert} />
        </Alert>
      )}

      <Alert theme="warning">
        Please note you´ll need some amount of ETH in your MetaMask wallet if
        you want to unlock account and pay transaction fees after unlock (table
        joins, transfers etc). Depending on the gas price you will need to pay
        ≈0.004 ETH to join the table.
      </Alert>
      <SubmitButton>OK</SubmitButton>
    </div>
  );
};
DepositDialog.propTypes = {
  account: PropTypes.object.isRequired,
};

export default DepositDialog;
