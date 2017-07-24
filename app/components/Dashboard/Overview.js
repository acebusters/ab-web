import React from 'react'; import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


import messages from '../../containers/Dashboard/messages';
import H2 from '../H2';
import List from '../List';
import Dropdown from '../Dropdown';

import { AccountIsLocked, AccountNotLocked } from './SectionReceive';
import Token from '../Dropdown/Token';
import {
  Pane,
  Section,
} from './styles';

const tokens = [{
  node: Token,
  props: {
    name: 'ethereum',
    amount: 0.13,
    unit: 'ETH',
    icon: 'url',
  },
}, {
  node: Token,
  props: {
    name: 'nutz',
    amount: 1000,
    unit: 'NTZ',
    icon: 'url',
  },
}];

const Overview = (props) => {
  const { account, listTxns } = props;
  return (
    <Pane name="dashboard-overview">

      <Dropdown options={tokens} {...props} />

      <Section name="wallet-receive">
        <H2>Deposit</H2>
        {account.isLocked ?
          <AccountIsLocked {...props} />
          :
          <AccountNotLocked {...props} />
        }
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
};
Overview.propTypes = {
  account: PropTypes.object,
  listTxns: PropTypes.array,
};

export default Overview;
