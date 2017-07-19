import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { createBlocky } from '../../services/blockies';
import {
  formatEth,
  formatNtz,
  formatAbp,
} from '../../utils/amountFormatter';

import H2 from '../H2';
import List from '../List';
import WithLoading from '../WithLoading';
import Blocky from '../Blocky';
import messages from '../../containers/Dashboard/messages';

import {
  BalanceSection,
  BalanceWrapper,
  Pane,
  Section,
} from './styles';

const Overview = ({
  babzBalance,
  listTxns,
  pwrBalance,
  signerAddr,
  weiBalance,
}) => (
  <Pane name="dashboard-overview">
    <Section name="player-info">
      <Blocky blocky={createBlocky(signerAddr)} />
    </Section>

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
  babzBalance: PropTypes.object,
  listTxns: PropTypes.array,
  pwrBalance: PropTypes.object,
  signerAddr: PropTypes.string,
  weiBalance: PropTypes.object,
};

export default Overview;
