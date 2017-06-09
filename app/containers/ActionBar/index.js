/**
 * Created by helge on 24.08.16.
 */
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
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

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setCards: (tableAddr, handId, cards) => setCards(tableAddr, handId, cards),
    sendMessage: (
      message, tableAddr, privKey,
    ) => dispatch(sendMessage(
      message, tableAddr, privKey,
    )),
    bet: (
      tableAddr, handId, amount, privKey, myPos, lastReceipt,
    ) => bet(
      tableAddr, handId, amount, privKey, myPos, lastReceipt,
    ),
    pay: (betAction) => pay(betAction, dispatch),
    fold: (tableAddr, handId, amount, privKey, myPos, lastReceipt,
      ) => fold(tableAddr, handId, amount, privKey, myPos, lastReceipt),
    check: (tableAddr, handId, amount, privKey, myPos, lastReceipt, checkType,
      ) => check(
        tableAddr, handId, amount, privKey, myPos, lastReceipt, checkType),
  };
}

const mapStateToProps = createStructuredSelector({
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
