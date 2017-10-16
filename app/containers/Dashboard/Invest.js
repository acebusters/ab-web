import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import BigNumber from 'bignumber.js';

import web3Connect from '../AccountProvider/web3Connect';
import {
  NTZ_DECIMALS,
  ABP_DECIMALS,
} from '../../utils/amountFormatter';
import { notifyCreate } from '../Notifications/actions';

import { modalDismiss } from '../App/actions';
import makeSelectAccountData, {
  makeSignerAddrSelector,
  makeSelectPrivKey,
  makeBlockySelector,
  makeNickNameSelector,
} from '../AccountProvider/selectors';
import {
  POWERUP,
  POWERDOWN,
  setActiveTab,
  setAmountUnit,
  setInvestType,
} from './actions';
import messages from './messages';
import {
  getActiveTab,
  getAmountUnit,
  getInvestType,
  getInvestTour,
  createDashboardTxsSelector,
} from './selectors';

import InvestComponent from '../../components/Dashboard/Invest';

import {
  ABI_CONTROLLER_CONTRACT,
  ABI_TOKEN_CONTRACT,
  ABI_POWER_CONTRACT,
  conf,
} from '../../app.config';

const confParams = conf();

class Invest extends React.Component {
  constructor(props) {
    super(props);

    this.handlePowerUp = this.handlePowerUp.bind(this);
    this.handlePowerDown = this.handlePowerDown.bind(this);

    this.web3 = props.web3Redux.web3;
    this.controller = this.web3.eth.contract(ABI_CONTROLLER_CONTRACT).at(confParams.contrAddr);
    this.token = this.web3.eth.contract(ABI_TOKEN_CONTRACT).at(confParams.ntzAddr);
    this.power = this.web3.eth.contract(ABI_POWER_CONTRACT).at(confParams.pwrAddr);
  }

  handleTxSubmit(txFn) {
    return new Promise((resolve, reject) => {
      txFn((err, result) => {
        this.props.modalDismiss();
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  handlePowerUp(amount) {
    this.props.notifyCreate(POWERUP, { amount });
    return this.handleTxSubmit((callback) => {
      this.token.powerUp.sendTransaction(
        new BigNumber(amount).mul(NTZ_DECIMALS),
        callback
      );
    });
  }

  handlePowerDown(amount) {
    this.props.notifyCreate(POWERDOWN, { amount });
    return this.handleTxSubmit((callback) => {
      this.power.transfer.sendTransaction(
        0,
        new BigNumber(amount).mul(ABP_DECIMALS),
        callback
      );
    });
  }

  render() {
    const { account, investType } = this.props;
    const completeSupplyBabz = this.controller.completeSupply();
    const totalSupplyPwr = this.power.totalSupply();
    const activeSupplyPwr = this.power.activeSupply();
    const activeSupplyBabz = this.token.activeSupply();
    const minPowerUpBabz = this.controller.minimumPowerUpSizeBabz();
    const babzBalance = this.token.balanceOf(account.proxy);
    const nutzBalance = babzBalance && babzBalance.div(NTZ_DECIMALS);
    const pwrBalance = this.power.balanceOf(account.proxy);

    return (
      <InvestComponent
        {...{
          account,
          setInvestType: this.props.setInvestType,
          minPowerUpBabz,
          babzBalance,
          pwrBalance,
          nutzBalance,
          totalSupplyPwr,
          completeSupplyBabz,
          activeSupplyPwr,
          activeSupplyBabz,
          messages,
          investType,
          handlePowerDown: this.handlePowerDown,
          handlePowerUp: this.handlePowerUp,
        }}
      />
    );
  }
}
Invest.propTypes = {
  account: PropTypes.object,
  modalDismiss: PropTypes.func,
  web3Redux: PropTypes.any,
  notifyCreate: PropTypes.func,
  investType: PropTypes.oneOf([POWERUP, POWERDOWN]).isRequired,
  setInvestType: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setInvestType,
  setActiveTab,
  setAmountUnit,
  notifyCreate: (type, props) => dispatch(notifyCreate(type, props)),
  modalDismiss,
});

const mapStateToProps = createStructuredSelector({
  activeTab: getActiveTab(),
  account: makeSelectAccountData(),
  blocky: makeBlockySelector(),
  dashboardTxs: createDashboardTxsSelector(),
  nickName: makeNickNameSelector(),
  signerAddr: makeSignerAddrSelector(),
  privKey: makeSelectPrivKey(),
  amountUnit: getAmountUnit(),
  investType: getInvestType(),
  investTour: getInvestTour(),
});

export default web3Connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invest);
