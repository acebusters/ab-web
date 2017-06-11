/**
 * Created by helge on 24.08.16.
 */
import React from 'react';

import ActionButton from './ActionButton';
import Slider from '../Slider';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => {
  const {
    amount,
    amountToCall,
    callAmount,
    handleBet,
    handleCall,
    handleCheck,
    handleFold,
    minRaise,
    myStack,
    visible,
    updateAmount,
  } = props;
  const buttonState1 = [
    {
      nodeName: 'fold',
      text: 'FOLD',
      size: 'medium',
      onClick: () => handleFold(),
    },
    {
      nodeName: 'call',
      text: `CALL ${callAmount}`,
      size: 'medium',
      onClick: () => handleCall(),
    },
    {
      nodeName: 'raise',
      text: `RAISE ${amount}`,
      size: 'medium',
      onClick: () => handleBet(),
    },
  ];
  const buttonState2 = [
    {
      nodeName: 'fold',
      text: 'FOLD',
      size: 'medium',
      onClick: () => handleFold(),
    },
    {
      nodeName: 'call',
      text: `CALL ${callAmount}`,
      size: 'medium',
      onClick: () => handleCall(),
    },
    {
      nodeName: 'null',
      text: '',
      size: 'medium',
      onClick: null,
    },
  ];
  const buttonState3 = [
    {
      nodeName: 'null',
      text: '',
      size: 'medium',
      onClick: null,
    },
    {
      nodeName: 'check',
      text: 'CHECK',
      size: 'medium',
      onClick: () => handleCheck(),
    },
    {
      nodeName: 'bet',
      text: `BET ${amount}`,
      size: 'medium',
      onClick: () => handleBet(),
    },
  ];
  const buttonStateNull = [
    {
      nodeName: 'null',
      text: '',
      size: 'medium',
      onClick: null,
    },
    {
      nodeName: 'null',
      text: '',
      size: 'medium',
      onClick: null,
    },
    {
      nodeName: 'null',
      text: '',
      size: 'medium',
      onClick: null,
    },
  ];
  const renderButtonGroup = () => {
    if (amountToCall > 0) {
      if (myStack > amountToCall) {
        return buttonState1;
      }
      return buttonState2;
    }
    if (amountToCall === 0) {
      return buttonState3;
    }
    return buttonStateNull;
  };
  if (visible) {
    return (
      <ActionBarWrapper name="action-bar-wrapper">
        {myStack > amountToCall &&
          <Slider
            data-orientation="vertical"
            value={amount}
            min={minRaise}
            max={myStack}
            step={1}
            onChange={updateAmount}
          />
        }
        <ControlPanel name="control-panel">
          {renderButtonGroup().map((item, index) => (
            <ActionButton
              name={item.nodeName}
              key={index}
              size={item.size}
              onClick={item.onClick}
              text={item.text}
            />
          ))}
        </ControlPanel>
      </ActionBarWrapper>
    );
  }
  return null;
};

ActionBar.propTypes = {
  amount: React.PropTypes.number,
  amountToCall: React.PropTypes.number,
  callAmount: React.PropTypes.number,
  handleBet: React.PropTypes.func,
  handleCheck: React.PropTypes.func,
  handleCall: React.PropTypes.func,
  handleFold: React.PropTypes.func,
  minRaise: React.PropTypes.number,
  myStack: React.PropTypes.number,
  updateAmount: React.PropTypes.func,
  visible: React.PropTypes.bool,
};

export default ActionBar;
