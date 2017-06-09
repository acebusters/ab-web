import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  // text,
  // boolean,
  // number,
} from '@storybook/addon-knobs';

import ActionBar from '../index';

const stories = storiesOf('ActionBar', module);

stories.addDecorator(withKnobs);

stories.add('action bar', () => <ActionBar />);
  // const guestClose = {
  //   blocky: null,
  //   loggedIn: false,
  //   nickName: 'Guest',
  //   open: boolean('open', false),
  // };
  // return <ActionBar />;
// );

// stories.add('user menu', () => {
//   const guestClose = {
//     blocky,
//     loggedIn: true,
//     nickName: text('nickName', 'DAWN'),
//     open: boolean('open', false),
//   };
//   return <TableMenu {...guestClose} />;
// });
