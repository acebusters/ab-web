import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TransferDialog from '../../containers/TransferDialog';

const PowerUp = (props) => {
  const {
    account,
    nutzBalance,
    handlePowerUp,
    messages,
  } = props;
  return (
    <div>
      {!account.isLocked ?
        <TransferDialog
          handleTransfer={handlePowerUp}
          maxAmount={nutzBalance}
          hideAddress
          title={<FormattedMessage {...messages.powerUpTitle} />}
          amountUnit="NTZ"
        />
        :
        <div>hello</div>
      }
    </div>
  );
};
PowerUp.propTypes = {
  account: PropTypes.object,
  nutzBalance: PropTypes.object,
  messages: PropTypes.object.isRequired,
  handlePowerUp: PropTypes.func,
};

export default PowerUp;
