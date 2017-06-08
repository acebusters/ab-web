/**
 * Created by helge on 24.08.16.
 */
import React from 'react';
import Raven from 'raven-js';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import TableService from '../../services/tableService';

import { setActionBarActive } from './actions';
import {
  makeSelectActionBarVisible,
  makeMinSelector,
  makeCallAmountSelector,
  makeAmountToCallSelector,
} from './selectors';

import { makeSelectPrivKey } from '../AccountProvider/selectors';

import {
  makeHandStateSelector,
  makeMyMaxBetSelector,
  makeIsMyTurnSelector,
  makeMyPosSelector,
  makeMessagesSelector,
  makePlayersCountSelector,
} from '../Table/selectors';

import {
  makeMyCardsSelector,
  makeMyStackSelector,
  makeLastReceiptSelector,
} from '../Seat/selectors';

import { setCards, sendMessage, bet, pay, fold, check } from '../Table/actions';

import ActionBar from '../../components/ActionBar';

class ActionBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBet = this.handleBet.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleFold = this.handleFold.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.table = new TableService(props.params.tableAddr, this.props.privKey);
  }

  componentWillReceiveProps(nextProps) {
    const min = nextProps.minRaise;
    const amount = (min && nextProps.myStack < min) ? nextProps.myStack : min;
    this.setState({ amount });
    if (nextProps.isMyTurn === true) {
      this.props.setActionBarActive(true);
    }
  }

  updateAmount(value) {
    let amount = parseInt(value, 10);
    amount = (amount > this.props.myStack) ? this.props.myStack : amount;
    this.setState({ amount });
  }

  captureError(handId) {
    const self = this;

    return (err) => {
      Raven.captureException(err, { tags: {
        tableAddr: self.props.params.tableAddr,
        handId,
      } });
      this.props.setActionBarActive(true);
    };
  }

  handleBet() {
    this.props.setActionBarActive(false);
    const amount = this.state.amount + this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);

    const betAction = this.props.bet(this.props.params.tableAddr, handId, amount, this.props.privKey, this.props.myPos, this.props.lastReceipt);
    return this.props.pay(betAction, this.props.dispatch)
    .then((cards) => {
      this.props.setCards(this.props.params.tableAddr, handId, cards);
    })
    .catch(this.captureError(handId));
  }

  handleCall() {
    const amount = parseInt(this.props.callAmount, 10);
    this.setState({ amount }, () => {
      this.handleBet();
    });
  }

  handleCheck() {
    this.props.setActionBarActive(false);
    const amount = this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);
    const checkStates = ['preflop', 'turn', 'river', 'flop'];
    const state = this.props.state;
    const checkType = checkStates.indexOf(state) !== -1 ? state : 'flop';
    const action = this.props.check(
      this.props.params.tableAddr,
      handId,
      amount,
      this.props.privKey,
      this.props.myPos,
      this.props.lastReceipt,
      checkType,
    );

    return this.props.pay(action, this.props.dispatch)
      .then((cards) => {
        this.props.setCards(this.props.params.tableAddr, handId, cards);
      })
      .catch(this.captureError(handId));
  }

  handleFold() {
    this.props.setActionBarActive(false);
    const amount = this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);
    const action = this.props.fold(
      this.props.params.tableAddr,
      handId,
      amount,
      this.props.privKey,
      this.props.myPos,
      this.props.lastReceipt
    );

    return this.props.pay(action, this.props.dispatch)
      .then((cards) => {
        this.props.setCards(this.props.params.tableAddr, handId, cards);
      })
      .catch(this.captureError(handId));
  }

  sendMessage(message) {
    this.props.sendMessage(message, this.props.params.tableAddr, this.props.privKey);
  }

  render() {
    return (
      <ActionBar
        active={this.state.active}
        amount={this.state.amount}
        handleBet={this.handleBet}
        handleCheck={this.handleCheck}
        handleCall={this.handleCall}
        handleFold={this.handleFold}
        updateAmount={this.updateAmount}
        sendMessage={this.sendMessage}
        {...this.props}
      />
    );
  }
}

ActionBarContainer.propTypes = {
  bet: React.PropTypes.func,
  callAmount: React.PropTypes.number,
  check: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  fold: React.PropTypes.func,
  lastReceipt: React.PropTypes.object,
  myMaxBet: React.PropTypes.number,
  myPos: React.PropTypes.number,
  myStack: React.PropTypes.number,
  pay: React.PropTypes.func,
  params: React.PropTypes.object,
  privKey: React.PropTypes.string,
  setCards: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  state: React.PropTypes.string,
  setActionBarActive: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setCards: (tableAddr, handId, cards) => setCards(tableAddr, handId, cards),
    sendMessage: (message, tableAddr, privKey) => dispatch(
      sendMessage(message, tableAddr, privKey)
    ),
    bet: (tableAddr, handId, amount, privKey, myPos, lastReceipt) => bet(
      tableAddr, handId, amount, privKey, myPos, lastReceipt,
    ),
    pay: (betAction) => pay(betAction, dispatch),
    fold: (tableAddr, handId, amount, privKey, myPos, lastReceipt) => fold(
      tableAddr, handId, amount, privKey, myPos, lastReceipt),
    check: (tableAddr, handId, amount, privKey, myPos, lastReceipt, checkType
      ) => check(
        tableAddr, handId, amount, privKey, myPos, lastReceipt, checkType
    ),
    setActionBarActive: (active) => dispatch(setActionBarActive(active)),
  };
}

const mapStateToProps = createStructuredSelector({
  actionBarVisible: makeSelectActionBarVisible(),
  privKey: makeSelectPrivKey(),
  myMaxBet: makeMyMaxBetSelector(),
  isMyTurn: makeIsMyTurnSelector(),
  amountToCall: makeAmountToCallSelector(),
  callAmount: makeCallAmountSelector(),
  minRaise: makeMinSelector(),
  myStack: makeMyStackSelector(),
  myPos: makeMyPosSelector(),
  lastReceipt: makeLastReceiptSelector(),
  cards: makeMyCardsSelector(),
  state: makeHandStateSelector(),
  messages: makeMessagesSelector(),
  playerCount: makePlayersCountSelector(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionBarContainer);
