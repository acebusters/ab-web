/**
 * Created by helge on 24.08.16.
 */
import React from 'react';
import Grid from 'grid-styled';
import Slider from 'react-rangeslider';
// Storybook: comment-out CSS file
import 'react-rangeslider/lib/index.css';
import Raven from 'raven-js';

import SliderWrapper from '../Slider';
import ChatWrapper from '../Chat';
import Chat from '../../containers/Chat';

// Storybook: comment-out actions
import { bet, pay, fold, check } from '../../containers/Table/actions';
import ActionButton from './ActionButton';
// Storybook: comment-out TableService
import TableService from '../../services/tableService';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

export class ActionBar extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleBet = this.handleBet.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleFold = this.handleFold.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    // Storybook: comment-out this.tabel
    this.table = new TableService(props.params.tableAddr, this.props.privKey);
    this.state = {
      active: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const min = nextProps.minRaise;
    const amount = (min && nextProps.myStack < min) ? nextProps.myStack : min;
    this.setState({ amount });
    if (nextProps.isMyTurn === true) {
      this.setActive(true);
    }
  }

  setActive(active) {
    this.setState({ active });
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
      self.setActive(true);
    };
  }

  handleBet() {
    this.setActive(false);
    const amount = this.state.amount + this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);

    const betAction = bet(this.props.params.tableAddr, handId, amount, this.props.privKey, this.props.myPos, this.props.lastReceipt);
    return pay(betAction, this.props.dispatch)
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
    this.setActive(false);
    const amount = this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);
    const checkStates = ['preflop', 'turn', 'river', 'flop'];
    const state = this.props.state;
    const checkType = checkStates.indexOf(state) !== -1 ? state : 'flop';
    const action = check(
      this.props.params.tableAddr,
      handId,
      amount,
      this.props.privKey,
      this.props.myPos,
      this.props.lastReceipt,
      checkType,
    );

    return pay(action, this.props.dispatch)
      .then((cards) => {
        this.props.setCards(this.props.params.tableAddr, handId, cards);
      })
      .catch(this.captureError(handId));
  }

  handleFold() {
    this.setActive(false);
    const amount = this.props.myMaxBet;
    const handId = parseInt(this.props.params.handId, 10);
    const action = fold(
      this.props.params.tableAddr,
      handId,
      amount,
      this.props.privKey,
      this.props.myPos,
      this.props.lastReceipt
    );

    return pay(action, this.props.dispatch)
      .then((cards) => {
        this.props.setCards(this.props.params.tableAddr, handId, cards);
      })
      .catch(this.captureError(handId));
  }

  sendMessage(message) {
    this.props.sendMessage(message, this.props.params.tableAddr, this.props.privKey);
  }

  render() {
    const isMyTurn = this.props.isMyTurn;
    const isTakePartOfAGame = this.props.myPos != null;
    const isAppropriateState = (
      this.props.state !== 'waiting'
      && this.props.state !== 'dealing'
      && this.props.state !== 'showdown'
    );
    const canSeeChat = (
      isTakePartOfAGame
      && !isMyTurn
      && isAppropriateState
    ) || !isTakePartOfAGame;
    const canSeeActionBar = (
      this.state.active
      && isMyTurn
      && isAppropriateState
    );
    if (canSeeActionBar) {
      const raiseButton = (this.props.myStack > this.props.amountToCall) ? (<ActionButton size="medium" onClick={this.handleBet} text={`RAISE ${this.state.amount}`} />) : null;
      return (
        <ActionBarWrapper name="action-bar-wrapper">
          <ControlPanel>
            <SliderWrapper>
              { this.props.myStack > this.props.amountToCall &&
                <Slider
                  key="betting-slider"
                  data-orientation="vertical"
                  value={this.state.amount}
                  min={this.props.minRaise}
                  max={this.props.myStack}
                  step={1}
                  onChange={this.updateAmount}
                >
                </Slider>
              }
            </SliderWrapper>
            <Grid xs={1 / 3}>
              { this.props.amountToCall > 0 &&
                <div>
                  { raiseButton }
                  <ActionButton size="medium" onClick={this.handleCall} text={`CALL ${this.props.callAmount}`}>
                  </ActionButton>
                  <ActionButton size="medium" onClick={this.handleFold} text="FOLD"></ActionButton>
                </div>
              }
              { this.props.amountToCall === 0 &&
                <div>
                  <ActionButton size="medium" onClick={this.handleBet} text={`BET ${this.state.amount}`}>
                  </ActionButton>
                  <ActionButton size="medium" onClick={this.handleCheck} text="CHECK">
                  </ActionButton>
                </div>
              }
            </Grid>
          </ControlPanel>
        </ActionBarWrapper>
      );
    } else if (canSeeChat) {
      const ta = this.props.params.tableAddr.substring(2, 8);
      const chatPlaceholder = `table <${ta}> in state ${this.props.state} has ${this.props.playerCount || 'no'} player${this.props.playerCount === 1 ? '' : 's'}.`;
      return (
        <ChatWrapper>
          <Chat onAddMessage={this.sendMessage} messages={this.props.messages} readonly={!isTakePartOfAGame} placeholder={chatPlaceholder} />
        </ChatWrapper>
      );
    }
    return null;
  }
}

ActionBar.propTypes = {
  params: React.PropTypes.object,
  privKey: React.PropTypes.string,
  lastReceipt: React.PropTypes.object,
  myPos: React.PropTypes.number,
  myMaxBet: React.PropTypes.number,
  isMyTurn: React.PropTypes.bool,
  minRaise: React.PropTypes.number,
  amountToCall: React.PropTypes.number,
  myStack: React.PropTypes.number,
  callAmount: React.PropTypes.number,
  state: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  setCards: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  messages: React.PropTypes.array,
  playerCount: React.PropTypes.number,
};

export default ActionBar;
