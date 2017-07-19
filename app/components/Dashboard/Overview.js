import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { createBlocky } from '../../services/blockies';
import {
  ETH_DECIMALS,
  NTZ_DECIMALS,
  formatEth,
  formatNtz,
  formatAbp,
} from '../../utils/amountFormatter';

import H2 from '../H2';
import List from '../List';
import WithLoading from '../WithLoading';
import Blocky from '../Blocky';
import { Section, DBButton } from '../../containers/Dashboard/styles';
import messages from '../../containers/Dashboard/messages';
import TransferDialog from '../../containers/TransferDialog';

import { Pane } from './styles';

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
    <Section name="wallet-overview">
      <Section name="nutz">
        <h2>Nutz</h2>
        <p>
          <span>Balance: </span>
          <WithLoading
            isLoading={!babzBalance}
            loadingSize="14px"
            type="inline"
            styles={{ layout: { marginLeft: '15px' } }}
          >
            <span>{babzBalance && formatNtz(babzBalance)} NTZ</span>
          </WithLoading>
        </p>
        {babzBalance &&
          <DBButton
            onClick={() => {
              this.props.modalAdd(
                <TransferDialog
                  title={<FormattedMessage {...messages.ntzTransferTitle} />}
                  handleTransfer={this.handleNTZTransfer}
                  maxAmount={babzBalance.div(NTZ_DECIMALS)}
                  amountUnit="NTZ"
                />
              );
            }}
            size="medium"
            icon="fa fa-money"
          >
            Transfer
          </DBButton>
        }
      </Section>

      <Section name="ether">
        <h2>Ether</h2>
        <p>
          <span>Balance: </span>
          <WithLoading
            isLoading={!weiBalance}
            loadingSize="14px"
            type="inline"
            styles={{ layout: { marginLeft: '15px' } }}
          >
            <span>{weiBalance && formatEth(weiBalance)} ETH</span>
          </WithLoading>
        </p>
        {weiBalance &&
          <DBButton
            onClick={() => {
              this.props.modalAdd(
                <TransferDialog
                  title={<FormattedMessage {...messages.ethTransferTitle} />}
                  handleTransfer={this.handleETHTransfer}
                  maxAmount={weiBalance.div(ETH_DECIMALS)}
                  amountUnit="ETH"
                />
              );
            }}
            size="medium"
            icon="fa fa-money"
          >
            Transfer
          </DBButton>
        }
      </Section>

      <Section name="power">
        <h2>Power</h2>
        <p>
          <span>Balance: </span>
          <WithLoading
            isLoading={!pwrBalance}
            loadingSize="14px"
            type="inline"
            styles={{ layout: { marginLeft: '15px' } }}
          >
            <span>{pwrBalance && formatAbp(pwrBalance)} ABP</span>
          </WithLoading>
        </p>
      </Section>
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
