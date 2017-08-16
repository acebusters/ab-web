import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import TransferDialog from '../../containers/TransferDialog';

const PowerUp = (props) => {
  const {
    messages,
    account,
    nutzBalance,
    handlePowerUp,
  } = props;
  return (
    <div>
      {!account.isLocked ?
        <TransferDialog
          handleTransfer={handlePowerUp}
          description={
            <FormattedHTMLMessage {...messages.powerUpDescr} />
          }
          maxAmount={nutzBalance}
          hideAddress
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
