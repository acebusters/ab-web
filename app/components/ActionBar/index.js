/**
 * Created by helge on 24.08.16.
 */
import React from 'react';
import Grid from 'grid-styled';

import ChatWrapper from '../Chat';
import Chat from '../../containers/Chat';

import ActionButton from './ActionButton';
import Slider from '../Slider';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => {
  const {
    active, amount, amountToCall, callAmount, isMyTurn, handleBet, handleCall,
    handleCheck, handleFold, messages, minRaise, myPos, myStack, params,
    playerCount, state, sendMessage, updateAmount,
  } = props;
  const isTakePartOfAGame = myPos != null;
  const isAppropriateState = (
    state !== 'waiting' && state !== 'dealing' && state !== 'showdown'
  );
  const canSeeChat = (isTakePartOfAGame && !isMyTurn && isAppropriateState) || !isTakePartOfAGame;
  if (active && isMyTurn && isAppropriateState) {
    return (
      <ActionBarWrapper name="action-bar-wrapper">
        <ControlPanel>
          { myStack > amountToCall &&
            <Slider
              data-orientation="vertical"
              value={amount}
              min={minRaise}
              max={myStack}
              step={1}
              onChange={updateAmount}
            />
          }
          <Grid xs={1 / 3}>
            {amountToCall > 0 &&
              <div>
                {(myStack > amountToCall) ? // raiseButton
                  <ActionButton
                    size="medium"
                    onClick={handleBet}
                    text={`RAISE ${amount}`}
                  />
                  : null
                }
                <ActionButton
                  size="medium"
                  onClick={handleCall}
                  text={`CALL ${callAmount}`}
                />
                <ActionButton
                  size="medium"
                  onClick={handleFold}
                  text="FOLD"
                />
              </div>
            }
            { amountToCall === 0 &&
              <div>
                <ActionButton
                  size="medium"
                  onClick={handleBet}
                  text={`BET ${amount}`}
                />
                <ActionButton
                  size="medium"
                  onClick={handleCheck}
                  text="CHECK"
                />
              </div>
            }
          </Grid>
        </ControlPanel>
      </ActionBarWrapper>
    );
  } else if (canSeeChat) {
    const ta = params.tableAddr.substring(2, 8);
    const chatPlaceholder = `table <${ta}> in state ${state} has ${playerCount || 'no'} player${playerCount === 1 ? '' : 's'}.`;
    return (
      <ChatWrapper>
        <Chat onAddMessage={sendMessage} messages={messages} readonly={!isTakePartOfAGame} placeholder={chatPlaceholder} />
      </ChatWrapper>
    );
  }
  return null;
};

ActionBar.propTypes = {
  active: React.PropTypes.bool,
  amount: React.PropTypes.number,
  amountToCall: React.PropTypes.number,
  callAmount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  handleCheck: React.PropTypes.func,
  handleCall: React.PropTypes.func,
  handleFold: React.PropTypes.func,
  updateAmount: React.PropTypes.func,
  sendMessage: React.PropTypes.func,
  isMyTurn: React.PropTypes.bool,
  messages: React.PropTypes.array,
  minRaise: React.PropTypes.number,
  myStack: React.PropTypes.number,
  myPos: React.PropTypes.number,
  state: React.PropTypes.string,
  params: React.PropTypes.object,
  playerCount: React.PropTypes.number,
};

export default ActionBar;
