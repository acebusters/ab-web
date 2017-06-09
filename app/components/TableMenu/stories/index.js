
import React from 'react';
import { fromJS } from 'immutable';

import { storiesOf } from '@storybook/react';

import TableMenu from '../index';

import { blocky } from '../../../app.config';

const guestClose = fromJS({
  blocky: null,
  loggedIn: false,
  nickName: 'Guest',
  open: false,
});
const guestOpen = guestClose.set('open', true);

const userClose = fromJS({
  blocky,
  loggedIn: true,
  nickName: 'DAWN',
  open: false,
});
const userOpen = userClose.set('open', true);

storiesOf('TableMenu', module)
  .add('guest menu closed', () => <TableMenu {...guestClose.toJS()} />)
  .add('guest menu open', () => <TableMenu {...guestOpen.toJS()} />)
  .add('user menu closed', () => <TableMenu {...userClose.toJS()} />)
  .add('user menu open', () => <TableMenu {...userOpen.toJS()} />);
