import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import {
  formatAbp,
  formatAmount,
  formatNum,
  toNtz,
  ABP_DECIMALS,
  NTZ_DECIMALS,
} from '../../utils/amountFormatter';
import { round } from '../../utils';

import { NTZ } from '../../containers/Dashboard/actions';
import ExchangeDialog from '../../containers/ExchangeDialog';

import FormField from '../Form/FormField';
import Alert from '../Alert';
import BtnUpgrade from '../Dashboard/BtnUpgrade';

import { Description } from './styles';

const PowerUp = (props) => {
  const {
    messages,
    account,
    nutzBalance,
    handlePowerUp,
    totalSupplyABP,
    totalSupplyNTZ,
    activeSupplyABP,
  } = props;
  const calcABPAmount = (ntz) => {
    const ntzAmount = new BigNumber(ntz.toString());
    return totalSupplyABP.mul(ntzAmount.div(totalSupplyNTZ.toString()));
  };
  const calcNTZtoABP = (amount) => formatAbp(calcABPAmount(round(amount, 8)).mul(ABP_DECIMALS));
  const totalAvailABP = totalSupplyABP.minus(activeSupplyABP);
  const powerUpRate = totalSupplyNTZ.div(totalSupplyABP);
  const powerUpMaxNtz = toNtz(totalAvailABP.mul(totalSupplyNTZ.div(totalSupplyABP)));
  const powerUpMinNtz = totalSupplyNTZ.div(NTZ_DECIMALS.mul(10000));
  return (
    <div>
      <Description>
        <FormattedHTMLMessage {...messages.powerUpDescr} />
        <Alert theme="info" style={{ textAlign: 'center' }}>
          <FormattedMessage
            {...messages.powerUpAvailable}
            values={{ amount: formatAmount(ABP_DECIMALS, totalAvailABP, 0) }}
          />
        </Alert>
        <Alert theme="info" style={{ textAlign: 'center' }}>
          <FormattedMessage
            {...messages.powerUpRate}
            values={{ amount: formatNum(powerUpRate, 0) }}
          />
        </Alert>
        <Alert theme="info" style={{ textAlign: 'center' }}>
          <FormattedMessage
            {...messages.powerUpMinAmount}
            values={{ amount: formatNum(powerUpMinNtz, 0) }}
          />
        </Alert>
      </Description>
      {!account.isLocked ?
        <ExchangeDialog
          form="exchangeNTZtoABP"
          handleExchange={handlePowerUp}
          maxAmount={nutzBalance || powerUpMaxNtz}
          minAmount={powerUpMinNtz}
          label={<FormattedMessage {...messages.powerUpAmountLabel} />}
          hideAddress
          amountUnit={NTZ}
          placeholder="0"
          calcExpectedAmount={calcNTZtoABP}
          expectedAmountUnit="ABP"
          component={FormField}
          {...props}
        />
        :
        <Alert theme="warning">
          <BtnUpgrade {...props} /> to Power Up.
        </Alert>
      }
    </div>
  );
};
PowerUp.propTypes = {
  account: PropTypes.object,
  nutzBalance: PropTypes.object,
  messages: PropTypes.object.isRequired,
  handlePowerUp: PropTypes.func,
  totalSupplyABP: PropTypes.object.isRequired,
  totalSupplyNTZ: PropTypes.object.isRequired,
  activeSupplyABP: PropTypes.object.isRequired,
};

export default PowerUp;
