import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { ABP_DECIMALS } from '../../utils/amountFormatter';
import TransferDialog from '../../containers/TransferDialog';

const PowerDown = (props) => {
  const {
    messages,
    totalSupply,
    pwrBalance,
    handlePowerDown,
  } = props;
  return (
    <TransferDialog
      title={<FormattedMessage {...messages.powerDownTitle} />}
      description={
        <FormattedHTMLMessage
          {...messages.powerDownDescr}
          values={{
            min: totalSupply.div(10000).div(ABP_DECIMALS).ceil().toNumber(),
          }}
        />
      }
      handleTransfer={handlePowerDown}
      maxAmount={pwrBalance.div(ABP_DECIMALS)}
      minAmount={totalSupply.div(10000).div(ABP_DECIMALS).ceil()}
      hideAddress
      amountUnit="ABP"
    />
  );
};
PowerDown.propTypes = {
  messages: PropTypes.object.isRequired,
  totalSupply: PropTypes.object,
  handlePowerDown: PropTypes.func,
  pwrBalance: PropTypes.object,
};

export default PowerDown;
