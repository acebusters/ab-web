import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { ABP_DECIMALS } from '../../utils/amountFormatter';

import TransferDialog from '../../containers/TransferDialog';

import H2 from '../H2';

import { Pane, Section, ExchangeContainer, DBButton } from './styles';

const Invest = (props) => {
  const {
    messages,
    account,
    babzBalance,
    nutzBalance,
    handlePowerUp,
    handlePowerDown,
    modalAdd,
    pwrBalance,
    totalSupply,
  } = props;
  return (
    <Pane name="dashboard-exchange" >
      <Section>
        <H2>Acebuster Power (ABP/NTZ)</H2>
        <ExchangeContainer>
          {babzBalance &&
            <DBButton
              onClick={() => modalAdd(
                <TransferDialog
                  handleTransfer={handlePowerUp}
                  maxAmount={nutzBalance}
                  hideAddress
                  title={<FormattedMessage {...messages.powerUpTitle} />}
                  amountUnit="NTZ"
                />
              )}
              size="medium"
              disabled={account.isLocked}
            >
              Power Up
            </DBButton>
          }

          {pwrBalance && totalSupply &&
            <DBButton
              onClick={() => modalAdd(
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
              )}
              size="medium"
              disabled={account.isLocked}
            >
              Power Down
            </DBButton>
          }
        </ExchangeContainer>
      </Section>
    </Pane>
  );
};
Invest.propTypes = {
  account: PropTypes.object,
  babzBalance: PropTypes.object,
  totalSupply: PropTypes.object,
  nutzBalance: PropTypes.object,
  messages: PropTypes.object,
  handlePowerDown: PropTypes.func,
  handlePowerUp: PropTypes.func,
  modalAdd: PropTypes.func,
  pwrBalance: PropTypes.object,
};

export default Invest;
