import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  // text,
  // boolean,
  // number,
} from '@storybook/addon-knobs';

import {
  combine, test1, test2, test3, test4, test5, test6, test7,
} from '../tests';

import ActionBar from '../../index';

const stories = storiesOf('ActionBar', module);

stories.addDecorator(withKnobs);

stories.add(combine(test1.describe, test1.it), () => (
  <ActionBar {...test1.props} />
));
stories.add(combine(test2.describe, test2.it), () => (
  <ActionBar {...test2.props} />
));
stories.add(combine(test3.describe, test3.it), () => (
  <ActionBar {...test3.props} />
));
stories.add(combine(test4.describe, test4.it), () => (
  <ActionBar {...test4.props} />
));
stories.add(combine(test5.describe, test5.it), () => (
  <ActionBar {...test5.props} />
));
stories.add(combine(test6.describe, test6.it), () => (
  <ActionBar {...test6.props} />
));
stories.add(combine(test7.describe, test7.it), () => (
  <ActionBar {...test7.props} />
));
