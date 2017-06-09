import { configure } from '@storybook/react';

function loadStories() {
  require('../stories');
  require('../app/components/TableMenu/stories');
}

configure(loadStories, module);
