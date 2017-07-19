import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import BigNumber from 'bignumber.js';

import ExchangeDialog from '../../containers/ExchangeDialog';
import TransferDialog from '../../containers/TransferDialog';
import messages from '../../containers/Dashboard/messages';

import { Pane, Section } from './styles';
import { DBButton } from '../../containers/Dashboard/styles';
import {
  ETH_DECIMALS,
  NTZ_DECIMALS,
  ABP_DECIMALS,
} from '../../utils/amountFormatter';

const Exchange = ({
  babzBalance,
  ceiling,
  floor,
  handleNTZSell,
  handleNTZPurchase,
  handlePowerUp,
  handlePowerDown,
  modalAdd,
  pwrBalance,
  weiBalance,
}) => (
  <Pane name="dashboard-exchange" >
    <Section>
      <h3>Ether &lt;&gt; Acebuster Nutz</h3>
      {babzBalance && floor &&
        <DBButton
          onClick={() => {
            modalAdd(
              <ExchangeDialog
                title={<FormattedMessage {...messages.sellTitle} />}
                amountUnit="ntz"
                calcExpectedAmount={(amount) => new BigNumber(amount).div(floor)}
                handleExchange={handleNTZSell}
                maxAmount={babzBalance.div(NTZ_DECIMALS)}
              />
            );
          }}
          size="medium"
          icon="fa fa-money"
        >
          Sell
        </DBButton>
      }
      {weiBalance && ceiling &&
        <DBButton
          onClick={() => {
            modalAdd(
              <ExchangeDialog
                title={<FormattedMessage {...messages.purchaseTitle} />}
                amountUnit="eth"
                calcExpectedAmount={(amount) => ceiling.mul(amount)}
                handleExchange={handleNTZPurchase}
                maxAmount={weiBalance.div(ETH_DECIMALS)}
              />
            );
          }}
          size="medium"
          icon="fa fa-money"
        >
          Purchase
        </DBButton>
      }
    </Section>
    <Section>
      <h3>Acebuster Power &lt;&gt; Nutz</h3>
      {babzBalance &&
        <DBButton
          onClick={() => {
            modalAdd(
              <TransferDialog
                handleTransfer={handlePowerUp}
                maxAmount={babzBalance.div(NTZ_DECIMALS)}
                hideAddress
                title={<FormattedMessage {...messages.powerUpTitle} />}
                amountUnit="NTZ"
              />
            );
          }}
          size="medium"
          icon="fa fa-money"
        >
          Power Up
        </DBButton>
      }

      {pwrBalance &&
        <DBButton
          onClick={() => {
            modalAdd(
              <TransferDialog
                title={<FormattedMessage {...messages.powerDownTitle} />}
                description="Power Down will convert ABP back to NTZ over a period of 3 month"
                handleTransfer={handlePowerDown}
                maxAmount={pwrBalance.div(ABP_DECIMALS)}
                hideAddress
                amountUnit="ABP"
              />
            );
          }}
          size="medium"
          icon="fa fa-money"
        >
          Power Down
        </DBButton>
      }
    </Section>
  </Pane>
);
Exchange.propTypes = {
  babzBalance: PropTypes.object,
  ceiling: PropTypes.object,
  floor: PropTypes.object,
  handleNTZSell: PropTypes.func,
  handleNTZPurchase: PropTypes.func,
  handlePowerDown: PropTypes.func,
  handlePowerUp: PropTypes.func,
  modalAdd: PropTypes.func,
  pwrBalance: PropTypes.object,
  weiBalance: PropTypes.object,
};

export default Exchange;
