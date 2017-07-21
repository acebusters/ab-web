import React from 'react';
import PropTypes from 'prop-types';

import {
  formatEth,
  formatNtz,
  formatAbp,
} from '../../utils/amountFormatter';

import WithLoading from '../WithLoading';

import {
  BalanceSection,
  BalanceWrapper,
} from './styles';

const Balances = ({
  babzBalance,
  pwrBalance,
  weiBalance,
}) => (
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
);
Balances.propTypes = {
  babzBalance: PropTypes.object,
  pwrBalance: PropTypes.object,
  weiBalance: PropTypes.object,
};

export default Balances;
