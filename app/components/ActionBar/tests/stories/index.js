import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';

import tests, { combine } from '../tests';
import {
  atTable0,
  atTable1,
  atTable2,
  amountToCall1,
  amountToCall2,
  amountToCall3,
  buttonBet0,
  buttonBet1,
} from '../tests2';

import ActionBar from '../../index';

const stories = storiesOf('ActionBar', module);

const createStory = (test) => {
  stories.add(combine(test.describe, test.it), () => (
    <ActionBar {...test.props} />
  ));
};

stories.addDecorator(withKnobs);

stories.add('Kitchen Sink', () => (
  <ActionBar
    active={boolean('active', true)}
    amount={number('amount', 100)}
    amountToCall={number('amountToCall', 100)}
    callAmount={number('callAmount', 0)}
    isMyTurn={boolean('isMyTurn', true)}
    minRaise={number('minRaise', 0)}
    myStack={number('myStack', 10000)}
    state={text('state', 'flop')}
    params={{ tableAddr: '0x33' }}
    visible={boolean('visible', true)}
    sliderOpen={boolean('sliderOpen', false)}
  />
));

createStory(atTable0);
createStory(atTable1);
createStory(atTable2);
createStory(amountToCall1);
createStory(amountToCall2);
createStory(amountToCall3);
createStory(buttonBet0);
createStory(buttonBet1);

// iterate over tests and add a story for each
tests.forEach((test) => {
  stories.add(combine(test.describe, test.it), () => (
    <ActionBar {...test.props} />
  ));
});
