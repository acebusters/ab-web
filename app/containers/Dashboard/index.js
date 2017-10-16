import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { CONFIRM_DIALOG } from 'containers/Modal/constants';

import web3Connect from '../AccountProvider/web3Connect';
import { addEventsDate, isUserEvent } from '../AccountProvider/utils';

import { modalAdd, modalDismiss } from '../App/actions';
import { contractEvents, proxyEvents } from '../AccountProvider/actions';
import makeSelectAccountData from '../AccountProvider/selectors';
import {
  OVERVIEW,
  WALLET,
  EXCHANGE,
  INVEST,
  setActiveTab,
} from './actions';
import messages from './messages';
import {
  getActiveTab,
  createDashboardTxsSelector,
} from './selectors';

import Container from '../../components/Container';
import Balances from '../../components/Dashboard/Balances';

import PanesRoot from '../../components/Dashboard/PanesRoot';
import Tabs from '../../components/Dashboard/Tabs';

import Invest from './Invest';
import Overview from './Overview';
import Wallet from './Wallet';
import Exchange from './Exchange';
import InvestTour from './InvestTour';

import { LOOK_BEHIND_PERIOD } from './constants';

import {
  ABI_CONTROLLER_CONTRACT,
  ABI_TOKEN_CONTRACT,
  ABI_POWER_CONTRACT,
  ABI_PROXY,
  ABI_PULL_PAYMENT_CONTRACT,
  MAIN_NET_GENESIS_BLOCK,
  conf,
} from '../../app.config';

const confParams = conf();

const PANES = {
  [OVERVIEW]: Overview,
  [WALLET]: Wallet,
  [EXCHANGE]: Exchange,
  [INVEST]: Invest,
};

const TABS = [
  {
    name: OVERVIEW,
    title: <FormattedMessage {...messages[OVERVIEW]} />,
    icon: 'fa-tachometer',
  },
  {
    name: WALLET,
    title: <FormattedMessage {...messages[WALLET]} />,
    icon: 'fa-money',
  },
  {
    name: EXCHANGE,
    title: <FormattedMessage {...messages[EXCHANGE]} />,
    icon: 'fa-exchange',
  },
  {
    name: INVEST,
    title: <FormattedMessage {...messages[INVEST]} />,
    icon: 'fa-line-chart',
  },
];

class DashboardRoot extends React.Component {
  constructor(props) {
    super(props);

    this.web3 = props.web3Redux.web3;

    this.controller = this.web3.eth.contract(ABI_CONTROLLER_CONTRACT).at(confParams.contrAddr);
    this.token = this.web3.eth.contract(ABI_TOKEN_CONTRACT).at(confParams.ntzAddr);
    this.power = this.web3.eth.contract(ABI_POWER_CONTRACT).at(confParams.pwrAddr);
    this.pullPayment = this.web3.eth.contract(ABI_PULL_PAYMENT_CONTRACT).at(confParams.pullAddr);

    if (this.props.account.proxy) {
      // ToDo: move all events stuff to sagas
      this.watchProxyEvents(this.props.account.proxy);
      this.watchTokenEvents(this.props.account.proxy);
      this.watchPowerEvents(this.props.account.proxy);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { account } = this.props;
    const { account: nextAccount } = nextProps;

    if (account.proxy === undefined && nextAccount.proxy) {
      this.watchProxyEvents(nextAccount.proxy);
      this.watchTokenEvents(nextAccount.proxy);
      this.watchPowerEvents(nextAccount.proxy);
    }

    if (this.props.dashboardTxs.txError !== nextProps.dashboardTxs.txError && nextProps.dashboardTxs.txError) {
      this.props.modalAdd({
        modalType: CONFIRM_DIALOG,
        modalProps: {
          title: <FormattedMessage {...messages.transactionErrorTitle} />,
          msg: nextProps.dashboardTxs.txError,
          onSubmit: this.props.modalDismiss,
          buttonText: <FormattedMessage {...messages.ok} />,
        },
      });
    }
  }

  watchProxyEvents(proxyAddr) {
    this.pullPayment.paymentOf.call(proxyAddr);
    this.power.downs.call(proxyAddr);

    this.proxy = this.web3.eth.contract(ABI_PROXY).at(proxyAddr);
    this.web3.eth.getBlockNumber((err, blockNumber) => {
      this.proxy.allEvents({
        fromBlock: blockNumber - LOOK_BEHIND_PERIOD,
        toBlock: 'latest',
      }).get((error, eventList) => {
        addEventsDate(eventList.filter(isUserEvent(proxyAddr)))
          .then((events) => this.props.proxyEvents(events, proxyAddr));
      });
    });
    this.proxy.allEvents({
      toBlock: 'latest',
    }).watch((error, event) => {
      if (!error && event) {
        if (event.event === 'Deposit') {
          this.pullPayment.paymentOf.call(proxyAddr);
        }

        addEventsDate([event])
          .then((events) => this.props.proxyEvents(events, proxyAddr));
        this.web3.eth.getBalance(proxyAddr);
      }
    });
  }

  watchPowerEvents(proxyAddr) {
    this.power.balanceOf.call(proxyAddr);
    this.web3.eth.getBlockNumber((err, blockNumber) => {
      this.power.allEvents({
        fromBlock: blockNumber - LOOK_BEHIND_PERIOD,
        toBlock: 'latest',
      }).get((error, eventList) => {
        addEventsDate(eventList.filter(isUserEvent(proxyAddr)))
          .then((events) => this.props.contractEvents(events, proxyAddr));
      });
    });

    this.power.downtime.call();
    this.power.totalSupply.call();
    this.power.activeSupply.call();
    this.controller.minimumPowerUpSizeBabz.call();
    this.power.allEvents({
      toBlock: 'latest',
    }).watch((error, event) => {
      if (!error && isUserEvent(proxyAddr)(event)) {
        addEventsDate([event])
          .then((events) => this.props.contractEvents(events, proxyAddr));
        this.power.balanceOf.call(proxyAddr);
        this.power.downs.call(proxyAddr);
        this.token.balanceOf.call(proxyAddr);
      }
    });
  }

  watchTokenEvents(proxyAddr) {
    this.token.floor.call();
    this.token.ceiling.call();
    this.controller.completeSupply.call();
    this.token.totalSupply.call();
    this.token.activeSupply.call();
    this.token.balanceOf.call(proxyAddr);
    this.web3.eth.getBalance(proxyAddr);

    this.web3.eth.getBlockNumber((err, blockNumber) => {
      this.token.allEvents({
        fromBlock: blockNumber - LOOK_BEHIND_PERIOD,
        toBlock: 'latest',
      }).get((error, eventList) => {
        addEventsDate(eventList.filter(isUserEvent(proxyAddr)))
          .then((events) => this.props.contractEvents(events, proxyAddr));
      });
    });

    this.token.allEvents({
      toBlock: 'latest',
    }).watch((error, event) => {
      if (!error && isUserEvent(proxyAddr)(event)) {
        if (event.event === 'Sell') {
          this.pullPayment.paymentOf.call(proxyAddr);
        }

        this.power.balanceOf.call(proxyAddr);
        this.token.balanceOf.call(proxyAddr);
        this.web3.eth.getBalance(proxyAddr);
      }
    });
  }

  render() {
    const { account } = this.props;
    const weiBalance = this.web3.eth.balance(account.proxy);
    const babzBalance = this.token.balanceOf(account.proxy);
    const pwrBalance = this.power.balanceOf(account.proxy);

    // before crowdsale end, disable INVEST tab on production
    const disabledTabs = conf().firstBlockHash === MAIN_NET_GENESIS_BLOCK ? [INVEST] : [];
    return (
      <Container>
        <Tabs
          tabs={TABS}
          disabledTabs={disabledTabs}
          {...this.props}
        />
        <Balances
          babzBalance={babzBalance}
          pwrBalance={pwrBalance}
          weiBalance={weiBalance}
        />
        <PanesRoot
          panes={PANES}
          paneType={this.props.activeTab}
          paneProps={this.props}
        />
        <InvestTour />
      </Container>
    );
  }
}
DashboardRoot.propTypes = {
  activeTab: PropTypes.string,
  account: PropTypes.object,
  contractEvents: PropTypes.func,
  dashboardTxs: PropTypes.object,
  modalAdd: PropTypes.func,
  modalDismiss: PropTypes.func,
  proxyEvents: PropTypes.func,
  web3Redux: PropTypes.any,
};

const mapDispatchToProps = () => ({
  setActiveTab,
  modalAdd,
  modalDismiss,
  proxyEvents,
  contractEvents,
});

const mapStateToProps = createStructuredSelector({
  activeTab: getActiveTab(),
  account: makeSelectAccountData(),
  dashboardTxs: createDashboardTxsSelector(),
});

export default web3Connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardRoot);
