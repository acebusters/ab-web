import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { DBButton } from '../../containers/Dashboard/styles';
import messages from '../../containers/Dashboard/messages';
import TransferDialog from '../../containers/TransferDialog';

import H2 from '../H2';
import Token from '../Dropdown/Token';
import Ethereum from '../Logo/Ethereum';
import Nutz from '../Logo/Nutz';
import Dropdown from '../Dropdown';
import Toggle from '../Dropdown/Toggle';

import {
  ControlWrapper,
  ControlDropdown,
  ControlToggle,
  Pane,
  Section,
  SendContainer,
  TabIcon as ModeIcon,
} from './styles';

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

const toggleValues = [{
  type: 'receive',
  name: <FormattedMessage {...messages.receive} />,
}, {
  type: 'send',
  name: <FormattedMessage {...messages.send} />,
}];

const Wallet = (props) => {
  const {
    babzBalance,
    ethBalance,
    nutzBalance,
    handleNTZTransfer,
    handleETHTransfer,
    modalAdd,
    weiBalance,
  } = props;
  return (
    <Pane name="dashboard-wallet">
      <ControlWrapper>
        <ControlDropdown>
          <Dropdown options={tokens} {...props} />
        </ControlDropdown>
        <ControlToggle>
          <Toggle values={toggleValues} />
        </ControlToggle>
      </ControlWrapper>

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
};

Wallet.propTypes = {
  babzBalance: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  handleNTZTransfer: PropTypes.func,
  handleETHTransfer: PropTypes.func,
  modalAdd: PropTypes.func,
  weiBalance: PropTypes.object,
};

export default Wallet;
