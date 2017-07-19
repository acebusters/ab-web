import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { createBlocky } from '../../services/blockies';
import {
  formatEth,
  formatNtz,
  formatAbp,
} from '../../utils/amountFormatter';

import messages from '../../containers/Dashboard/messages';
import UpgradeDialog from '../../containers/UpgradeDialog';
import AccountProgress from '../../containers/Dashboard/AccountProgress';

import Alert from '../Alert';
import Button from '../Button';
import Blocky from '../Blocky';
import WithLoading from '../WithLoading';
import H2 from '../H2';
import List from '../List';

import {
  BalanceSection,
  BalanceWrapper,
  Pane,
  Section,
} from './styles';


const Overview = ({
  ETH_FISH_LIMIT,
  account,
  babzBalance,
  ethBalance,
  nutzBalance,
  floor,
  listTxns,
  modalDismiss,
  modalAdd,
  pwrBalance,
  signerAddr,
  weiBalance,
}) => (
  <Pane name="dashboard-overview">
    <Section name="player-info">
      <Blocky blocky={createBlocky(signerAddr)} />
    </Section>

    {account.isLocked &&
      <Section>
        <Alert theme="warning">
          Warning: account limit {ETH_FISH_LIMIT.toString()} ETH<br />
          <Button
            size="link"
            onClick={() => modalAdd(
              <UpgradeDialog
                proxyContract={this.proxy}
                onSuccessButtonClick={modalDismiss}
              />
            )}
          >
            Upgrade to shark account
          </Button> to deposit more
        </Alert>

        {ethBalance && nutzBalance && floor &&
          <AccountProgress
            ethBalance={ethBalance}
            nutzBalance={nutzBalance}
            floor={floor}
            ethLimit={ETH_FISH_LIMIT}
          />
        }
      </Section>
    }

    <Section>
      <H2>Balances</H2>
      <BalanceSection name="wallet-overview">
        <BalanceWrapper name="nutz">
          <h2>Nutz</h2>
          <p>
            <WithLoading
              isLoading={!babzBalance}
              loadingSize="14px"
              type="inline"
              styles={{ layout: { marginLeft: '15px' } }}
            >
              <span>{babzBalance && formatNtz(babzBalance)} NTZ</span>
            </WithLoading>
          </p>
        </BalanceWrapper>

        <BalanceWrapper name="ether">
          <h2>Ether</h2>
          <p>
            <WithLoading
              isLoading={!weiBalance}
              loadingSize="14px"
              type="inline"
              styles={{ layout: { marginLeft: '15px' } }}
            >
              <span>{weiBalance && formatEth(weiBalance)} ETH</span>
            </WithLoading>
          </p>
        </BalanceWrapper>

        <BalanceWrapper name="power">
          <h2>Power</h2>
          <p>
            <WithLoading
              isLoading={!pwrBalance}
              loadingSize="14px"
              type="inline"
              styles={{ layout: { marginLeft: '15px' } }}
            >
              <span>{pwrBalance && formatAbp(pwrBalance)} ABP</span>
            </WithLoading>
          </p>
        </BalanceWrapper>
      </BalanceSection>
    </Section>

    <Section name="transaction-history">
      <H2><FormattedMessage {...messages.included} /></H2>
      <List
        items={listTxns}
        headers={[
          '',
          'Address',
          'Date',
          '',
          'Amount',
          '',
        ]}
        columnsStyle={{
          0: { width: 20 },
          1: { textAlign: 'left', width: 10, whiteSpace: 'nowrap' },
          2: { width: 20 },
          3: { textAlign: 'left', whiteSpace: 'nowrap' },
          4: { textAlign: 'right', whiteSpace: 'nowrap' },
          5: { width: '100%', textAlign: 'left' },
        }}
        noDataMsg="No Transactions Yet"
      />
    </Section>
  </Pane>
);
Overview.propTypes = {
  ETH_FISH_LIMIT: PropTypes.object,
  account: PropTypes.object,
  babzBalance: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  floor: PropTypes.object,
  listTxns: PropTypes.array,
  modalAdd: PropTypes.func,
  modalDismiss: PropTypes.func,
  pwrBalance: PropTypes.object,
  signerAddr: PropTypes.string,
  weiBalance: PropTypes.object,
};

export default Overview;
