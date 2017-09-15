import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import BigNumber from 'bignumber.js';

import ExchangeDialog from '../../containers/ExchangeDialog';
import { ETH, NTZ } from '../../containers/Dashboard/actions';
import { formatNtz, NTZ_DECIMALS } from '../../utils/amountFormatter';

import TokenAmountField from '../Form/TokenAmountField';

import { Pane, Section, ExchangeContainer } from './styles';

const Exchange = (props) => {
  const {
    amountUnit,
    ETH_FISH_LIMIT,
    messages,
    account,
    ethBalance,
    nutzBalance,
    ceiling,
    floor,
    handleNTZSell,
    handleNTZPurchase,
  } = props;
  const calcETHAmount = (ntz) => new BigNumber(ntz.toString()).div(floor);
  const calcNTZAmount = (eth) => ceiling.mul(eth.toString());
  return (
    <Pane name="dashboard-exchange" >
      <Section>
        <ExchangeContainer>
          {amountUnit === NTZ && nutzBalance && floor &&
            <ExchangeDialog
              form="exchangeNTZtoETH"
              component={TokenAmountField}
              title={<FormattedMessage {...messages.sellTitle} />}
              descr={<FormattedMessage {...messages.floorPrice} values={{ amount: formatNtz(floor.mul(NTZ_DECIMALS)) }} />}
              amountUnit={NTZ}
              calcExpectedAmount={calcETHAmount}
              handleExchange={handleNTZSell}
              maxAmount={BigNumber.min(
                account.isLocked
                  ? BigNumber.max(ETH_FISH_LIMIT.sub(ethBalance), 0).mul(floor)
                  : nutzBalance,
                nutzBalance
              )}
              placeholder="0"
              expectedAmountUnit="eth"
              {...props}
            />
          }
          {amountUnit === ETH && ethBalance && ceiling &&
            <ExchangeDialog
              form="exchangeETHtoNTZ"
              component={TokenAmountField}
              title={<FormattedMessage {...messages.purchaseTitle} />}
              descr={<FormattedMessage {...messages.ceilingPrice} values={{ amount: formatNtz(ceiling.mul(NTZ_DECIMALS)) }} />}
              amountUnit={ETH}
              calcExpectedAmount={calcNTZAmount}
              handleExchange={handleNTZPurchase}
              maxAmount={BigNumber.min(
                account.isLocked
                  ? BigNumber.max(ETH_FISH_LIMIT.sub(calcETHAmount(nutzBalance)), 0)
                  : ethBalance,
                ethBalance
              )}
              placeholder="0.00"
              expectedAmountUnit="ntz"
              {...props}
            />
          }
        </ExchangeContainer>
      </Section>
    </Pane>
  );
};
Exchange.propTypes = {
  ETH_FISH_LIMIT: PropTypes.object,
  amountUnit: PropTypes.oneOf([ETH, NTZ]),
  account: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  messages: PropTypes.object,
  ceiling: PropTypes.object,
  floor: PropTypes.object,
  handleNTZSell: PropTypes.func,
  handleNTZPurchase: PropTypes.func,
};

export default Exchange;
