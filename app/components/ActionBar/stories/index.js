import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  // text,
  // boolean,
  // number,
} from '@storybook/addon-knobs';

import ActionBar from '../index';

const TBL_ADDR = '0x77aabb1133';

const stories = storiesOf('ActionBar', module);

stories.addDecorator(withKnobs);

stories.add('action bar', () => {
  const props = {
    params: {
      tableAddr: TBL_ADDR,
    },
  };
  return <ActionBar {...props} />;
});
