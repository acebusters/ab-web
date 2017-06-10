import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  // text,
  // boolean,
  // number,
} from '@storybook/addon-knobs';

import tests, { combine } from '../tests';

import ActionBar from '../../index';

const stories = storiesOf('ActionBar', module);

stories.addDecorator(withKnobs);

// iterate over tests and add a story for each
tests.forEach((test) => {
  stories.add(combine(test.describe, test.it), () => (
    <ActionBar {...test.props} />
  ));
});
