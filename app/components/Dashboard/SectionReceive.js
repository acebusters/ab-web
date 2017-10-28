import React from 'react';
import PropTypes from 'prop-types';
import ethUtil from 'ethereumjs-util';
import { FormattedMessage } from 'react-intl';

import BtnUpgrade from 'containers/Button/BtnUpgrade';
import messages from '../../containers/Dashboard/messages';
import AccountProgress from '../../containers/Dashboard/AccountProgress';
import { MAIN_NET_GENESIS_BLOCK, ETH_FISH_LIMIT, conf } from '../../app.config';
import shapeshiftButton from './shapeshift.png';

import Alert from '../Alert';

import DepositInfo from './DepositInfo';
import {
  ReceiveWrapper,
  ReceiveSection,
} from './styles';

function handleShapeshiftClick(e) {
  e.preventDefault();
  window.open(e.currentTarget.href, conf().shapeshiftKey, 'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0');
}

const shapeShiftLink = (proxy) => `https://shapeshift.io/shifty.html?destination=${proxy}&output=ETH&apiKey=${conf().shapeshiftKey}`;

export const SectionReceive = (props) => {
  const {
    account,
    ethBalance,
    nutzBalance,
    floor,
  } = props;
  return (
    <ReceiveSection>
      <ReceiveWrapper>
        <DepositInfo data-tour="wallet-address" />

        {conf().firstBlockHash === MAIN_NET_GENESIS_BLOCK &&
          <a
            onClick={handleShapeshiftClick}
            href={shapeShiftLink(ethUtil.toChecksumAddress(account.proxy))}
          >
            <img src={shapeshiftButton} alt="Pay with Shapeshift" />
          </a>
        }

        {conf().firstBlockHash !== MAIN_NET_GENESIS_BLOCK &&
          <Alert theme="danger">
            <FormattedMessage {...messages.ethAlert} />
          </Alert>
        }
        <Alert theme="warning">
          Please note you´ll need some amount of ETH in your MetaMask wallet if you want to unlock account and pay transaction fees after unlock (table joins, transfers etc). Depending on the gas price you will need to pay ≈0.004 ETH to join the table.
        </Alert>

        {account.isLocked && ethBalance && nutzBalance && floor &&
          <Alert theme="warning" data-tour="wallet-unlock">
            <FormattedMessage values={{ limit: ETH_FISH_LIMIT.toString() }} {...messages.ethLimit} />
            <BtnUpgrade {...{ account, messages }} />
            <AccountProgress
              ethBalance={ethBalance}
              nutzBalance={nutzBalance}
              floor={floor}
              ethLimit={ETH_FISH_LIMIT}
            />
          </Alert>
        }
      </ReceiveWrapper>
    </ReceiveSection>
  );
};
SectionReceive.propTypes = {
  account: PropTypes.object,
  ethBalance: PropTypes.object,
  nutzBalance: PropTypes.object,
  floor: PropTypes.object,
};

export default SectionReceive;
