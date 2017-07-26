import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import messages from '../../containers/Dashboard/messages';
import {
  ETH,
  // NTZ,
} from '../../containers/Dashboard/actions';
import TransferDialog from '../../containers/TransferDialog';

import H2 from '../H2';
import Token from '../Dropdown/Token';
import Ethereum from '../Logo/Ethereum';
import Nutz from '../Logo/Nutz';
import Dropdown from '../Dropdown';

import {
  ControlWrapper,
  ControlDropdown,
  Pane,
  Section,
  SendContainer,
  TabIcon as ModeIcon,
} from './styles';
import { AccountIsLocked, AccountNotLocked } from './SectionReceive';

const tokens = [{
  node: Token,
  props: {
    name: <FormattedMessage {...messages.ethereum} />,
    amount: 0.13,
    unit: 'ETH',
    icon: <Ethereum height={30} width={30} />,
  },
}, {
  node: Token,
  props: {
    name: <FormattedMessage {...messages.nutz} />,
    amount: 1000,
    unit: 'NTZ',
    icon: <Nutz height={30} width={30} />,
  },
}];

const Wallet = (props) => {
  const {
    account,
    // babzBalance,
    ethBalance,
    nutzBalance,
    handleNTZTransfer,
    handleETHTransfer,
    unit,
    // weiBalance,
  } = props;
  const selected = unit === ETH ? 0 : 1;
  return (
    <Pane name="dashboard-wallet">

      <Section name="wallet-receive">
        <H2><ModeIcon className="fa fa-inbox" />Deposit</H2>
        {account.isLocked ?
          <AccountIsLocked {...props} />
          :
          <AccountNotLocked {...props} />
        }
      </Section>

      <Section name="wallet-send">
        <H2><ModeIcon className="fa fa-send" />Transfer</H2>
        <ControlWrapper>
          <ControlDropdown>
            <Dropdown
              options={tokens}
              selected={selected}
              {...props}
            />
          </ControlDropdown>
        </ControlWrapper>
        <SendContainer>
          {unit === ETH ?
            <TransferDialog
              // title={<FormattedMessage {...messages.ethTransferTitle} />}
              handleTransfer={handleETHTransfer}
              maxAmount={ethBalance}
              amountUnit="ETH"
            />
          :
            <TransferDialog
              // title={<FormattedMessage {...messages.ntzTransferTitle} />}
              handleTransfer={handleNTZTransfer}
              maxAmount={nutzBalance}
              amountUnit="NTZ"
            />
          }
        </SendContainer>
        <SendContainer>
        </SendContainer>
      </Section>

    </Pane>
  );
};

Wallet.propTypes = {
  account: PropTypes.object,
  // babzBalance: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  handleNTZTransfer: PropTypes.func,
  handleETHTransfer: PropTypes.func,
  unit: PropTypes.string,
  // weiBalance: PropTypes.object,
};

export default Wallet;
